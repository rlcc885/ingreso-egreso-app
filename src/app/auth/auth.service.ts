import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: User;

  get user() {
    return this._user;
  }

  constructor( private auth: AngularFireAuth,
               private router: Router,
               private firestore: AngularFirestore,
               private store: Store<AppState> ) { }

  initAuthListener() {
    this.auth.authState.subscribe( (fuser: firebase.User) => {
      if ( fuser) {
        this.userSubscription = this.firestore.doc( `${ fuser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {
            const user = User.fromFirebase( firestoreUser );
            this._user = user;
            // this.store.dispatch( setUser );
          });
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        // this.store.dispatch(  );
        // this.store.dispatch(  );
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {
    this.store.dispatch( isLoading() );
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then( ({user}) => {
        const newUser = new User( nombre, user.email, user.uid);
        this.firestore.doc(`${ newUser.uid }/usuario`)
            .set( { ...newUser } )
            .then( () => {
              this.router.navigate(['/']);
              this.store.dispatch( stopLoading() );
            } );
      })
      .catch( error => {
        console.log( error );
        this.store.dispatch( stopLoading() );
        if (error.code !== 'auth/email-already-in-use') Swal.fire('Error registro', error.message, 'error');
      });
  }

  login( email: string, password: string) {
    this.store.dispatch( isLoading() );
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then( resp => {
        console.log(resp);
        this.router.navigate(['/']);
        this.store.dispatch( stopLoading() );
      })
      .catch( error => {
        console.log(error);
        Swal.fire('Error en el login', error.message, 'error');
        this.store.dispatch( stopLoading() );
      })
  }

  logout() {
    this.router.navigate(['/login']);
    this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState
      .pipe(
        map( fbUser => {
          if ( fbUser == null ) this.router.navigate(['/login']);
          return fbUser != null;
        } )
      );
  }
}
