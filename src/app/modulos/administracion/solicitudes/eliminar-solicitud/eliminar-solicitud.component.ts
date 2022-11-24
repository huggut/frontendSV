import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent {
  id: string = '';

  constructor(private servicioSolicitud: SolicitudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.EliminarPersona();
  }

  EliminarPersona(){
    this.servicioSolicitud.EliminarSolicitud(this.id).subscribe((datos: any) => {
      this.router.navigate(["/administracion/listar-solicitudes"]);
    })
  }
}
