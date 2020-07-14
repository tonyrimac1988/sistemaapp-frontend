import { Operador } from './../_model/operador'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  operadorCambio = new Subject<Operador[]>();
  mensajeCambio = new Subject<string>();
  listaCambio = new Subject<Operador[]>();

  url: string = `${environment.HOST}/operadores`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Operador[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Operador>(`${this.url}/${id}`);
  }

  registrar(operador: Operador) {
    return this.http.post(this.url, operador);
  }

  modificar(operador: Operador) {
    return this.http.put(this.url, operador);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

}
