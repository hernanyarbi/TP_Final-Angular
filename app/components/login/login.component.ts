import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeUno = false;
  mensajeDos = false;
  loginForm: any = {};
  usuarioLogueado = {};
  returnUrl: string;
  constructor(private route:ActivatedRoute, private router: Router, private authenticationService:AuthenticationService) {
    this.usuarioLogueado = localStorage.getItem("usuarioLogueado");
    console.log(this.usuarioLogueado);


  }


  login()
  {
    this.authenticationService.login(this.loginForm.username, this.loginForm.password).subscribe(
      data =>
      {
        let user = data;
        if(user)
        {
          if(user.username != "" && user.activo == false){
            this.authenticationService.userLoggedIn = true;
            localStorage.setItem("usuarioLogueado", JSON.stringify(user));
            localStorage.setItem("perfil", user.perfil);
            this.authenticationService.perfil = user.perfil;
            this.authenticationService.nombreLogueado = user.username;
            this.authenticationService.usuarioLogueado = new Usuario(user.id, user.email, user.username, "", user.activo, user.perfil);
            this.router.navigateByUrl('home');
          }
          else if(user.activo == true)
          {
             this.mensajeDos = true;
             setTimeout(() => {
               this.mensajeDos = false;
             }, 3000)
          }
          else
          {
            this.mensajeUno = true;
            setTimeout(() => {
              this.mensajeUno = false;
            }, 3000)
          }
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
