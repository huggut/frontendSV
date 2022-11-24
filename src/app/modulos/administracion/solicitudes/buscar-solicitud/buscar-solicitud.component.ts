import { Component } from '@angular/core';
import { ModeloSolicitud } from 'src/app/modelos/solicitud.modelo';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-buscar-solicitud',
  templateUrl: './buscar-solicitud.component.html',
  styleUrls: ['./buscar-solicitud.component.css']
})
export class BuscarSolicitudComponent {
  listadoRegistros: ModeloSolicitud[] = [];

  constructor(private solicitudServicio: SolicitudService) { }

  ngOnInit(): void {
    this.ObtenerListadoPersonas();
  }

  ObtenerListadoPersonas(){
    this.solicitudServicio.ObtenerRegistros().subscribe((datos: ModeloSolicitud[]) => {
      this.listadoRegistros = datos;
    })
  }
}
