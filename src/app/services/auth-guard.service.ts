import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap( estado => {
          if(!estado) this.router.navigate(['/login']);
        }));
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap( estado => {
          if (!estado) this.router.navigate( ['/login']);
        }),
        take( 1 )
      )
    ;
  }
}
