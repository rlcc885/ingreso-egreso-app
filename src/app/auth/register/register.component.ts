import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any): void {
    this.authService.crearUsuario(data.nombre, data.email, data.password);
    console.log( data );
  }
}
