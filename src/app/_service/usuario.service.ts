import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../_model/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();
  listaCambio = new Subject<Usuario[]>();
  
  url: string = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Usuario[]>(this.url);
  }

  registrar(usuario: Usuario){
    return this.http.post(this.url, usuario);
  }

  modificar(usuario: Usuario){
    return this.http.put(this.url, usuario);
  }

  eliminar(id : number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPorId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
 
  consultarUsuario(usuario: string) {
    return this.http.get(`${this.url}/${usuario}`, {
      responseType: 'blob'
    });
  }

  generarExcel(tiporeporte : string) {
    return this.http.post(`${this.url}/generarReporte`,tiporeporte, {
      responseType: 'blob'
    });
    
  }

}
