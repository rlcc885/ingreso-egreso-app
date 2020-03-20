import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  ingresosSubscription: Subscription;

  constructor( private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( ({user}) => {
      console.log(user);
      this.ingresosSubscription = this.ingresoEgresoService.initIngresosEgresosListener( user.uid )
        .subscribe( ingresosEgresosFB => {
          this.store.dispatch( setItems( { items: ingresosEgresosFB }) );
        });
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.ingresosSubscription?.unsubscribe();
  }
}
