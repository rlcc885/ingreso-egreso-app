import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean = false;
  uiSubscription: Subscription;

  loginForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router, ) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
    this.loginForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login(): void {
    if( this.loginForm.invalid ) return;
    this.store.dispatch( isLoading() );
    const { email, password } = this.loginForm.value;
    this.authService.login( email, password )
      .then( credenciales => {
        console.log( credenciales );
        this.store.dispatch( stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch( stopLoading() );
        Swal.fire( {
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }
}
