import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropietarioService } from '../../services/propietario-service';
import { LocalService } from '../../services/local-service';
import { AlquilerService } from '../../services/alquiler-service';
import { Propietario } from '../../models/propietario';
import { Local } from '../../models/local';
import { Alquiler } from '../../models/alquiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css'],
  providers: [ PropietarioService, LocalService, AlquilerService ]
})
export class AlquilerComponent implements OnInit {
  usuarioLogueado = {};
  arrayLocals:Array<Local>;
  arrayPropietarios:Array<Propietario>;
  arrayAlquileres:Array<Alquiler>;
  fechaBusq:Date;
  fechaBusqEnabled:boolean=false;
  muestraAlquileres:Array<Alquiler>;
  newAlquiler:Alquiler;
  editAlquiler:Alquiler;
  propID:number;
  locID:number;

  constructor(private propService:PropietarioService, private localService:LocalService, private alqService:AlquilerService, private router:Router,private modalService: NgbModal) {
    this.newAlquiler = new Alquiler();
    this.usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if(localStorage.getItem("usuarioLogueado") == null)
    {
      router.navigateByUrl('login');
    }
    this.cargarLocals();
    this.cargarPropietarios();
    this.cargarAlquileres();
  }

  actualizarMuestraAlquileres(){
    this.muestraAlquileres = new Array();
    if(this.fechaBusqEnabled){
      for(let alq of this.arrayAlquileres){
        if(alq.fechaAlquiler.getTime == this.fechaBusq.getTime) this.muestraAlquileres.push(alq);
      }
    }
    else{
      this.muestraAlquileres = this.arrayAlquileres;
    }
  }


  cargarPropietarios(){
    this.propService.getPropietarios().subscribe(
      result=>{
        this.arrayPropietarios = JSON.parse(result.propietarios);
      },
      error =>{
        console.error(error);
      }
    );
  }

  abrirModal(modal){
    this.modalService.open(modal);
  }

  cargarLocals(){
    this.localService.getLocals().subscribe(
      result=>{
        this.arrayLocals = JSON.parse(result.locals);
      },
      error =>
      {
        console.error(error);
      }
    );
  }


  cargarAlquileres(){
    this.alqService.getAlquilers().subscribe(
      result=>{
        this.arrayAlquileres = JSON.parse(result.alquileres);
        this.actualizarMuestraAlquileres();
      },
      error =>{
        console.error(error);
      }
    );
  }


  borrarAlquiler(alq:Alquiler){
    alq.local.alquilado = false;
    this.actualizarLocal(alq.local);
    this.alqService.eliminarAlquiler(alq).subscribe(
      result=>{
        this.cargarAlquileres();
      },
      error =>{
        console.error(error);
      }
    )
  }


  actualizarLocal(loc:Local){
    this.localService.updateLocal(loc).subscribe(
      data=> {
        this.cargarLocals();
      },
      error =>{
        console.error(error);
      }
    );
  }

  crearAlquiler(){
    let s:Local;
    for(s of this.arrayLocals){
      if(s.id == this.locID){
        break;
      }
    }
    s.alquilado = true;
    this.actualizarLocal(s);
    let prop:Propietario;
    for(prop of this.arrayPropietarios){
      if(prop.id == this.propID){
        break;
      }
    }

    this.newAlquiler.local = s;
    this.newAlquiler.propietario = prop;

    this.alqService.createAlquiler(this.newAlquiler).subscribe(
      result =>{
        this.cargarAlquileres();
        this.newAlquiler = new Alquiler();
      },
      error =>{
        console.error(error);
      }
    );
  }


  establecerPrecioCuota(){
    let s:Local;
    for(s of this.arrayLocals){
      if(s.id == this.locID){
        this.newAlquiler.costoalquiler = s.costomes;
        return 1;
      }
    }
  }
  ngOnInit() {
  }

}
