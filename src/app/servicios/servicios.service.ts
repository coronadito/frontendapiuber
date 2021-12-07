import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioModelo } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
     }

  // Conexión con la api de loopback, o sea el backend
  url = "http://localhost:3000"
  token: string = ''

  // Implementación de los métodos CRUD
  // CREATE
  store(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.post<ServicioModelo>(`${this.url}/servicios`, {
      fecha: servicio.fecha,
      hora_inicio: servicio.hora_inicio,
      hora_final: servicio.hora_final,
      placa: servicio.placa,
      nombre_conductor: servicio.nombre_conductor,
      dinero_recogio: servicio.dinero_recogio,
      ruta: servicio.ruta
      });
  }

  // READ
  getAll(): Observable<ServicioModelo[]>{
    return this.http.get<ServicioModelo[]>(`${this.url}/servicios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  // UPDATE
  update(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.put<ServicioModelo>(`${this.url}/servicios/${servicio.id}`, {
      fecha: servicio.fecha,
      hora_inicio: servicio.hora_inicio,
      hora_final: servicio.hora_final,
      placa: servicio.placa,
      nombre_conductor: servicio.nombre_conductor,
      dinero_recogio: servicio.dinero_recogio,
      ruta: servicio.ruta
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  // DELETE
  delete(id: string): Observable<ServicioModelo[]>{
    return this.http.delete<ServicioModelo[]>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  // CONSULTAR
  getWithId(id: string): Observable<ServicioModelo>{
    return this.http.get<ServicioModelo>(`${this.url}/servicios/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
  
}
