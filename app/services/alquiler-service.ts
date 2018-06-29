import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AlquilerService {
    constructor(private _http: Http) {

    }
    getAlquilers()
    {
        return this._http.get("http://localhost/proyectoFinal/web/app_dev.php/alquiler/")
        .map(res => res.json());
    }

    createAlquiler(alquiler) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(alquiler);
        return this._http.post('http://localhost/proyectoFinal/web/app_dev.php/alquiler/new', body, options).map((res: Response) => res.json());
    }
    
    updateAlquiler(alquiler)
    {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(alquiler);
      let postURL = "http://localhost/proyectoFinal/web/app_dev.php/alquiler/" + alquiler.id + "/edit"
      return this._http.post(postURL, body, options).map((res: Response) => res.json());
    }
    eliminarAlquiler(alquiler)
    {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(alquiler);
  
      let postURL = "http://localhost/proyectoFinal/web/app_dev.php/alquiler/"+alquiler.id;
      return this._http.delete(postURL, options).map((res: Response) => res.json());
    }
    

}