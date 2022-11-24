import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit{

  fgValidador: FormGroup = this.fb.group({
    'placa': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]],
    'tipoVehiculo': ['', [Validators.required]],
    'tipoOferta': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'departamento': ['', [Validators.required]],
    'ciudad': ['', [Validators.required]],
    'imagen': ['', [Validators.required]],
    'estado': ['', [Validators.required]],
    'asesorId': ['', [Validators.required]],
    'nombreEncargado': ['', [Validators.required]],
    'correoEncargado': ['', [Validators.required]],
    'celularEncargado': ['', [Validators.required]]
   });
  
    constructor(private fb: FormBuilder,
      private servicioVehiculo: VehiculoService,
      private router: Router) { }
  
    ngOnInit(): void {
    }
  
    GuardarVehiculo(){
      let placa = this.fgValidador.controls["placa"].value;
      let descripcion = this.fgValidador.controls["descripcion"].value;
      let tipoVehiculo = this.fgValidador.controls["tipoVehiculo"].value;
      let tipoOferta = this.fgValidador.controls["tipoOferta"].value;
      let precio = this.fgValidador.controls["precio"].value;
      let departamento = this.fgValidador.controls["departamento"].value;
      let ciudad = this.fgValidador.controls["ciudad"].value;
      let imagen = this.fgValidador.controls["imagen"].value;
      let estado = this.fgValidador.controls["estado"].value;
      let asesorId = this.fgValidador.controls["asesorId"].value;
      let nombreEncargado = this.fgValidador.controls["nombreEncargado"].value;
      let correoEncargado = this.fgValidador.controls["correoEncargado"].value;
      let celularEncargado = this.fgValidador.controls["celularEncargado"].value;
      let p = new ModeloVehiculo();
      p.placa = placa;
      p.descripcion = descripcion;
      p.tipoVehiculo = tipoVehiculo;
      p.tipoOferta = tipoOferta;
      p.precio = precio;
      p.departamento =departamento;
      p.ciudad = ciudad;
      p.imagen = imagen;
      p.estado = estado;
      p.asesorId = asesorId;
      p.nombreEncargado = nombreEncargado;
      p.correoEncargado = correoEncargado;
      p.celularEncargado = celularEncargado;
  
      this.servicioVehiculo.CrearVehiculo(p).subscribe((datos: ModeloVehiculo) => {
        alert("Vehículo agregado");
        this.router.navigate(["/administracion/listar-vehiculos"]);
      }, (error: any) => {
        alert("Error Vehiculo NO agregado");
      })
    }
}
