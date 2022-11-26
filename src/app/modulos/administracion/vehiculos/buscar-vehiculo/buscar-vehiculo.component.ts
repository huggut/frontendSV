import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.component.html',
  styleUrls: ['./buscar-vehiculo.component.css']
})
export class BuscarVehiculoComponent {
  listadoRegistros: ModeloVehiculo[] = [];
  noCliente: boolean = false;
  subs: Subscription = new Subscription();

  constructor(
    private vehiculoServicio: VehiculoService,
    private seguridadServicio: SeguridadService) { }

  ngOnInit(): void {
    this.ObtenerListadoVehiculos();
    this.subs = this.seguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe((datos:ModeloIdentificar) => {
      if(datos.datos?.rol != "cliente")
      this.noCliente = true;
      else{
        this.noCliente = false;
      }
    })
  }

  ObtenerListadoVehiculos(){
    this.vehiculoServicio.ObtenerRegistros().subscribe((datos: ModeloVehiculo[]) => {
      this.listadoRegistros = datos;
    })
  }
}
