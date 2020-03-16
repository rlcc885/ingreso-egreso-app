import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group( {
      nombre: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  // onSubmit(data: any): void {
  //   this.authService.crearUsuario(data.nombre, data.email, data.password);
  //   console.log( data );
  // }

  crearUsuario() {
    if ( this.registroForm.invalid ) return ;
    this.store.dispatch( isLoading() );
    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario( nombre, correo, password)
      .then( credenciales => {
        console.log( credenciales);
        this.store.dispatch( stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch( stopLoading());
        Swal.fire( {
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      })
  }
}
