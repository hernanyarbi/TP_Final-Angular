import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local-service';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.css'],
  providers: [ LocalService ]
})

export class VisitanteComponent implements OnInit {
  locales = [];
  constructor(private servicio:LocalService) {
    this.cargarLocales()
  }

  ngOnInit() {
  }

  cargarLocales(){
    this.servicio.getLocals().subscribe(
      result=>{
        this.locales = JSON.parse(result.locals);
        console.log(this.locales);
      },
      error =>{
        console.error(error);
      }
    );
  }

}
