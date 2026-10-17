import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProductoMockService } from './producto-mock.service';

describe('ProductoMockService', () => {
  let service: ProductoMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list initial mock products', async () => {
    const productos = await firstValueFrom(service.listar());
    expect(productos.length).toBe(3);
    expect(productos[0].nombre).toBe('Teclado');
  });

  it('should register a new product', async () => {
    const nuevo = await firstValueFrom(
      service.registrar({ nombre: 'Webcam', precio: 120, stock: 10 })
    );
    expect(nuevo.id).toBe(4);
    expect(nuevo.estadoStock).toBe('DISPONIBLE');

    const lista = await firstValueFrom(service.listar());
    expect(lista.length).toBe(4);
  });

  it('should find product by id', async () => {
    const p = await firstValueFrom(service.buscarPorId(2));
    expect(p).toBeDefined();
    expect(p?.nombre).toBe('Mouse');
  });
});
