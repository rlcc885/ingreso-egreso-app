import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router ) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then( resp => {
        console.log( resp );
        this.router.navigate(['/']);
      })
      .catch( error => {
        console.log( error );
      });
  }

  login( email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then( resp => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch( error => console.log(error) )
  }
}
