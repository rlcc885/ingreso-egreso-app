import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    delete ingresoEgreso.uid; //verificar el borrar el uid
    return this.firestore.doc( `${ uid }/ingresos-egresos`)
      .collection( 'items' )
      .add( { ...ingresoEgreso } )
      .then( (ref) => console.log( 'exito!', ref ) )
      .catch( (err) => console.warn(err) );
  }
}
