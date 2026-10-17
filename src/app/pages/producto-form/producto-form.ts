import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoMockService } from '../../services/producto-mock.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss'
})
export class ProductoForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productoService = inject(ProductoMockService);

  id?: number;
  editando = false;

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.id = Number(param);
      this.editando = true;
      this.productoService.buscarPorId(this.id).subscribe(p => {
        if (p) {
          this.form.patchValue({
            nombre: p.nombre,
            precio: p.precio,
            stock: p.stock
          });
        }
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valor = this.form.getRawValue();
    console.log('Datos del formulario mock:', valor);

    if (this.editando && this.id) {
      this.productoService.actualizar(this.id, valor).subscribe(() => {
        this.router.navigate(['/productos']);
      });
    } else {
      this.productoService.registrar(valor).subscribe(() => {
        this.router.navigate(['/productos']);
      });
    }
  }
}
