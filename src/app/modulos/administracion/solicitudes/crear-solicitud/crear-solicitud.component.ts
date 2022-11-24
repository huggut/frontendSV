import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'tipoSolicitud': ['', [Validators.required]],
    'fechaSolicitud': ['', [Validators.required]],
    'clienteId': ['', [Validators.required]],
    'vehiculoId': ['', [Validators.required]],
    'estado': ['', [Validators.required]],
    'comentarios': ['', [Validators.required]]
   });
  
    constructor(private fb: FormBuilder,
      private servicioSolicitud: SolicitudService,
      private router: Router) { }
  
    ngOnInit(): void {
    }
  
    GuardarSolicitud(){
      let tipoSolicitud = this.fgValidador.controls["tipoSolicitud"].value;
      let fechasolicitud = this.fgValidador.controls["fechaSolicitud"].value;
      let clienteId = this.fgValidador.controls["clienteId"].value;
      let vehiculoId = this.fgValidador.controls["vehiculoId"].value;
      let estado = this.fgValidador.controls["estado"].value;
      let comentarios = this.fgValidador.controls["comentarios"].value;

      let p = new ModeloSolicitud();
      p.tipoSolicitud = tipoSolicitud;
      p.fechaSolicitud = fechasolicitud;
      p.clienteId = clienteId;
      p.vehiculoId = vehiculoId;
      p.estado = estado;
      p.comentarios =comentarios;
  
      this.servicioSolicitud.CrearSolicitud(p).subscribe((datos: ModeloSolicitud) => {
        alert("Solicitud agregada");
        this.router.navigate(["/administracion/listar-solicitudes"]);
      }, (error: any) => {
        alert("Error, solicitud NO agregada");
      })
    }
}
