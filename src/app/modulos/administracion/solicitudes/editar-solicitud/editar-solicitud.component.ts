import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent {

  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'tipoSolicitud': ['', [Validators.required]],
    'fechaSolicitud': ['', [Validators.required]],
    'clienteId': ['', [Validators.required]],
    'vehiculoId': ['', [Validators.required]],
    'estado': ['', [Validators.required]],
    'comentarios': ['', [Validators.required]]
   });
  
    constructor(private fb: FormBuilder,
      private servicioSolicitud: SolicitudService,
      private router: Router,
      private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"];
      this.BuscarSolicitud();
    }

    BuscarSolicitud(){
      this.servicioSolicitud.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloSolicitud) => {
        this.fgValidador.controls["id"].setValue(this.id);
        this.fgValidador.controls["tipoSolicitud"].setValue(datos.tipoSolicitud);
        this.fgValidador.controls["fechaSolicitud"].setValue(datos.fechaSolicitud);
        this.fgValidador.controls["clienteId"].setValue(datos.clienteId);
        this.fgValidador.controls["vehiculoId"].setValue(datos.vehiculoId);
        this.fgValidador.controls["estado"].setValue(datos.estado);
        this.fgValidador.controls["comentarios"].setValue(datos.comentarios);
      })
    }
  
    EditarSolicitud(){
      let tipoSolicitud = this.fgValidador.controls["tipoSolicitud"].value;
      let fechaSolicitud = this.fgValidador.controls["fechaSolicitud"].value;
      let clienteId = this.fgValidador.controls["clienteId"].value;
      let vehiculoId = this.fgValidador.controls["vehiculoId"].value;
      let estado = this.fgValidador.controls["estado"].value;
      let comentarios = this.fgValidador.controls["comentarios"].value;

      let p = new ModeloSolicitud();
      p.tipoSolicitud = tipoSolicitud;
      p.fechaSolicitud = fechaSolicitud;
      p.clienteId = clienteId;
      p.vehiculoId = vehiculoId;
      p.estado = estado;
      p.comentarios = comentarios;
      p.id = this.id;
  
      this.servicioSolicitud.ActualizarSolicitud(p).subscribe((datos: ModeloSolicitud) => {
        alert("Solicitud actualizada");
        this.router.navigate(["/administracion/listar-solicitudes"]);
      }, (error: any) => {
        alert("Error, solicitud NO actualizada");
      })
    }
}
