import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RutaModelo } from '../modelos/ruta.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
     }

  // Conexión con la api de loopback, o sea el backend
  url = "http://localhost:3000"
  token: string = ''

  // Implementación de los métodos CRUD
  // CREATE
  store(ruta: RutaModelo): Observable<RutaModelo> {
    return this.http.post<RutaModelo>(`${this.url}/rutas`, {
      tiempo_estimado: ruta.tiempo_estimado,
      origen: ruta.origen,
      destino : ruta.destino
    });
  }

  // READ
  getAll(): Observable<RutaModelo[]>{
    return this.http.get<RutaModelo[]>(`${this.url}/rutas`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  // UPDATE
  update(ruta: RutaModelo): Observable<RutaModelo> {
    return this.http.put<RutaModelo>(`${this.url}/rutas/${ruta.id}`, {
      tiempo_estimado: ruta.tiempo_estimado,
      origen: ruta.origen,
      destino : ruta.destino
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  // DELETE
  delete(id: string): Observable<RutaModelo[]>{
    return this.http.delete<RutaModelo[]>(`${this.url}/rutas/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  // CONSULTAR
  getWithId(id: string): Observable<RutaModelo>{
    return this.http.get<RutaModelo>(`${this.url}/rutas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
