import { HttpClient } from '@angular/common/http'
import { Area } from './../_model/area'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  areaCambio = new Subject<Area[]>();
  mensajeCambio = new Subject<string>();

  listaCambio = new Subject<Area[]>();

  url: string = `${environment.HOST}/areas`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Area[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Area>(`${this.url}/${id}`);
  }

  registrar(area : Area) {
    return this.http.post(this.url, area);
  }

  modificar(area : Area) {
    return this.http.put(this.url, area);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  generarExcel(tiporeporte : string) {
    return this.http.post(`${this.url}/generarReporte`,tiporeporte, {
      responseType: 'blob'
    });
    
  }
  
}
