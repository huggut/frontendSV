import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  url = 'http://localhost:3000';
  token: String = '';

  constructor(private http: HttpClient, 
    private seguridadServicio:SeguridadService) { 
      this.token = this.seguridadServicio.ObtenerToken();
    }

  ObtenerRegistros(): Observable<ModeloPersona[]>{
    return this.http.get<ModeloPersona[]>(`${this.url}/usuarios`);
  }

  ObtenerRegistroPorId(id: string): Observable<ModeloPersona>{
    return this.http.get<ModeloPersona>(`${this.url}/usuarios/${id}`);
  }

  CrearPersona(usuario: ModeloPersona): Observable<ModeloPersona>{
    return this.http.post<ModeloPersona>(`${this.url}/usuarios`, usuario, {
     // headers: new HttpHeaders({
     //   'Authorization': `Bearer ${this.token}`
      })
   // })
  }

  ActualizarPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.put<ModeloPersona>(`${this.url}/usuarios/${persona.id}`, persona, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarPersona(id: string): Observable<any>{
    return this.http.delete(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
