import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuardService } from '../services/auth-guard.service';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [ AuthGuardService ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas ),
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
