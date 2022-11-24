import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-eliminar-vehiculo',
  templateUrl: './eliminar-vehiculo.component.html',
  styleUrls: ['./eliminar-vehiculo.component.css']
})
export class EliminarVehiculoComponent {
  id: string = '';

  constructor(private servicioVehiculo: VehiculoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.EliminarVehiculo();
  }

  EliminarVehiculo(){
    this.servicioVehiculo.EliminarVehiculo(this.id).subscribe((datos: any) => {
      this.router.navigate(["/administracion/listar-vehiculos"]);
    })
  }
}
