import { Injectable } from '@angular/core';

import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Usuario } from '../models/usuario';

@Injectable()
export class AuthenticationService {
  userLoggedIn : boolean = false;
  nombreLogueado:string;
  perfil:string;
  usuarioLogueado : Usuario;
  constructor(private http:Http) { }

  login(username: string, password: string) {
      return this.http.post('http://localhost/proyectoFinal/web/app_dev.php/usuario/authenticate', JSON.stringify({ username: username, password: password }))
          .map(res => res.json());
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('usuarioLogueado');
      this.userLoggedIn = false;
      this.cambiarEstado(this.usuarioLogueado.usuario).subscribe(
        data =>
        {
        },
        error =>
        {

        }
    );
    this.usuarioLogueado = null;

  } 
  cambiarEstado(username:string)
  {
    return this.http.post('http://localhost/proyectoFinal/web/app_dev.php/usuario/logout', JSON.stringify({ username: username }))
  }
}
