import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Producto } from '../../models/producto';
import { ProductoMockService } from '../../services/producto-mock.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss'
})
export class Catalogo implements OnInit {
  productos = signal<Producto[]>([]);

  constructor(private productoService: ProductoMockService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.productoService.listar().subscribe(datos => this.productos.set([...datos]));
  }

  eliminar(id?: number): void {
    if (!id || !confirm('¿Desea eliminar este producto?')) return;
    this.productoService.eliminar(id).subscribe(() => this.cargar());
  }
}
