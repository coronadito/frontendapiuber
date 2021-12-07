import { Injectable } from '@angular/core';
import { EstacionModelo } from '../modelos/estacion.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

    // Conexión con la api de loopback, o sea el backend
    url = "http://localhost:3000"
    token: string = ''

    // Implementación de los métodos CRUD
    // CREATE
    store(estaciones: EstacionModelo): Observable<EstacionModelo> {
      return this.http.post<EstacionModelo>(`${this.url}/estacions`, {
        nombre: estaciones.nombre,
        direccion: estaciones.direccion,
        coordenada_x: estaciones.coordenada_x,
        coordenada_y: estaciones.coordenada_y,
        Tipo: estaciones.Tipo
      } ,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
      );
    }

    // READ
    getAll(): Observable<EstacionModelo[]>{
      return this.http.get<EstacionModelo[]>(`${this.url}/estacions`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    // UPDATE
    update(estaciones: EstacionModelo): Observable<EstacionModelo> {
      return this.http.put<EstacionModelo>(`${this.url}/estacions/${estaciones.id}`, {
        nombre: estaciones.nombre,
        direccion: estaciones.direccion,
        coordenada_x: estaciones.coordenada_x,
        coordenada_y: estaciones.coordenada_y,
        Tipo: estaciones.Tipo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    // DELETE
    delete(id: string): Observable<EstacionModelo[]>{
      return this.http.delete<EstacionModelo[]>(`${this.url}/estacions/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    // CONSULTAR
    getWithId(id: string): Observable<EstacionModelo>{
      return this.http.get<EstacionModelo>(`${this.url}/estacions/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
