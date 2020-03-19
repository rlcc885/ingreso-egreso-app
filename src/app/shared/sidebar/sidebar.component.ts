import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario: User;
  userSubscription: Subscription;

  constructor( private authService: AuthService,
               private store: Store<AppState>,
               private router: Router ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe( filter( ({user}) => user != null))
      .subscribe( ({user}) => this.usuario = user )
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .then( () => this.router.navigate(['/login']) );
  }
}
