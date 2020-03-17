import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';

  constructor( private formBuilder: FormBuilder,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required/*, Validators.min(0)*/],
    });
  }

  guardar(): void {
    if ( this.ingresoForm.invalid ) return ;
    console.log( this.ingresoForm.value );
    console.log( this.tipo );
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );
    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.ingresoForm.reset();
        Swal.fire( 'Registrado creado', descripcion, 'success' );
      })
      .catch( err => Swal.fire('Error', err.messag, 'error'));
  }
}
