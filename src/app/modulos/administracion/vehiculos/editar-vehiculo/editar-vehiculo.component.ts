import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {

  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
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
      private router: Router,
      private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"];
      this.BuscarVehiculo();
    }

    BuscarVehiculo(){
      this.servicioVehiculo.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloVehiculo) => {
        this.fgValidador.controls["id"].setValue(this.id);
        this.fgValidador.controls["placa"].setValue(datos.placa);
        this.fgValidador.controls["descripcion"].setValue(datos.descripcion);
        this.fgValidador.controls["tipoVehiculo"].setValue(datos.tipoVehiculo);
        this.fgValidador.controls["tipoOferta"].setValue(datos.tipoOferta);
        this.fgValidador.controls["precio"].setValue(datos.precio);
        this.fgValidador.controls["departamento"].setValue(datos.departamento);
        this.fgValidador.controls["ciudad"].setValue(datos.ciudad);
        this.fgValidador.controls["imagen"].setValue(datos.imagen);
        this.fgValidador.controls["estado"].setValue(datos.estado);
        this.fgValidador.controls["asesorId"].setValue(datos.asesorId);
        this.fgValidador.controls["nombreEncargado"].setValue(datos.nombreEncargado);
        this.fgValidador.controls["correoEncargado"].setValue(datos.correoEncargado);
        this.fgValidador.controls["celularEncargado"].setValue(datos.celularEncargado);
      })
    }
  
    EditarVehiculo(){
      let placa = this.fgValidador.controls["placa"].value;
      let descripcion = this.fgValidador.controls["descripcion"].value;
      let tipoVehiculo = this.fgValidador.controls["tipoVehiculo"].value;
      let tipoOferta = this.fgValidador.controls["tipoOferta"].value;
      let precio = parseInt(this.fgValidador.controls["precio"].value);
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
      p.id = this.id;
  
      this.servicioVehiculo.ActualizarVehiculo(p).subscribe((datos: ModeloVehiculo) => {
        alert("Vehiculo actualizado");
        this.router.navigate(["/administracion/listar-vehiculos"]);
      }, (error: any) => {
        alert("Error Vehiculo NO actualizado");
      })
    }
/*
    GuardarVehiculo(){
      let placa = this.fgValidador.controls["placa"].value;
      let descripcion = parseInt(this.fgValidador.controls["descripcion"].value);
      let tipoVehiculo = this.fgValidador.controls["tipoVehiculo"].value;
      let tipoOferta = this.fgValidador.controls["tipoOferta"].value;
      let precio = parseInt(this.fgValidador.controls["precio"].value);
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
  
      this.servicioVehiculo.ActualizarVehiculo(p).subscribe((datos: ModeloVehiculo) => {
        alert("Vehículo actualizado");
        this.router.navigate(["/administracion/listar-vehiculos"]);
      }, (error: any) => {
        alert("Error Vehiculo NO actualizado");
      })
    } */
}
