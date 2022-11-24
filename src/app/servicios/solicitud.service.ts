import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloSolicitud } from '../modelos/solicitud.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url = 'http://localhost:3000';
  token: String = '';

  constructor(private http: HttpClient, 
    private seguridadServicio:SeguridadService) { 
      this.token = this.seguridadServicio.ObtenerToken();
    }

  ObtenerRegistros(): Observable<ModeloSolicitud[]>{
    return this.http.get<ModeloSolicitud[]>(`${this.url}/solicitudes`);
  }

  ObtenerRegistroPorId(id: string): Observable<ModeloSolicitud>{
    return this.http.get<ModeloSolicitud>(`${this.url}/solicitudes/${id}`);
  }

  CrearSolicitud(solicitud: ModeloSolicitud): Observable<ModeloSolicitud>{
    return this.http.post<ModeloSolicitud>(`${this.url}/solicitudes`, solicitud, {
     // headers: new HttpHeaders({
     //   'Authorization': `Bearer ${this.token}`
      })
   // })
  }

  ActualizarSolicitud(solicitud: ModeloSolicitud): Observable<ModeloSolicitud>{
    return this.http.put<ModeloSolicitud>(`${this.url}/solicitudes/${solicitud.id}`, solicitud, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarSolicitud(id: string): Observable<any>{
    return this.http.delete(`${this.url}/solicitudes/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
