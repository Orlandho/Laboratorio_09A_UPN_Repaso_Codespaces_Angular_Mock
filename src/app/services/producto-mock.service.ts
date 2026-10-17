import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductoMockService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Teclado', precio: 85, stock: 8, estadoStock: 'DISPONIBLE' },
    { id: 2, nombre: 'Mouse', precio: 45, stock: 3, estadoStock: 'BAJO' },
    { id: 3, nombre: 'Monitor', precio: 620, stock: 5, estadoStock: 'DISPONIBLE' }
  ];

  listar(): Observable<Producto[]> {
    return of([...this.productos]);
  }

  buscarPorId(id: number): Observable<Producto | undefined> {
    const p = this.productos.find(item => item.id === id);
    return of(p ? { ...p } : undefined);
  }

  registrar(producto: Producto): Observable<Producto> {
    const nextId = this.productos.length > 0
      ? Math.max(...this.productos.map(p => p.id || 0)) + 1
      : 1;
    const nuevo: Producto = {
      ...producto,
      id: nextId,
      estadoStock: producto.stock < 5 ? 'BAJO' : 'DISPONIBLE'
    };
    this.productos.push(nuevo);
    return of(nuevo);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = {
        ...producto,
        id,
        estadoStock: producto.stock < 5 ? 'BAJO' : 'DISPONIBLE'
      };
      return of(this.productos[index]);
    }
    return of(producto);
  }

  eliminar(id: number): Observable<boolean> {
    const initialLen = this.productos.length;
    this.productos = this.productos.filter(p => p.id !== id);
    return of(this.productos.length < initialLen);
  }
}
