import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

    // Conexión con la api de loopback, o sea el backend
    url = "http://localhost:3000"
    token: string = ''

    // Implementación de los métodos CRUD
    // CREATE
    store(usuario: UsuarioModelo): Observable<UsuarioModelo> {
      return this.http.post<UsuarioModelo>(`${this.url}/usuarios`, {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        correo: usuario.correo
      });
    }

    // READ
    getAll(): Observable<UsuarioModelo[]>{
      return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    // UPDATE
    update(usuario: UsuarioModelo): Observable<UsuarioModelo> {
      return this.http.put<UsuarioModelo>(`${this.url}/usuarios/${usuario.id}`, {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        correo: usuario.correo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    // DELETE
    delete(id: string): Observable<UsuarioModelo[]>{
      return this.http.delete<UsuarioModelo[]>(`${this.url}/usuarios/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    // CONSULTAR
    getWithId(id: string): Observable<UsuarioModelo>{
      return this.http.get<UsuarioModelo>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

}
