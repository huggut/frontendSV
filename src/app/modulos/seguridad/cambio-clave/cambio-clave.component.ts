import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as cryptoJS from "crypto-js";
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'clave': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private router: Router,
    private servicioSeguridad: SeguridadService) { }

  ngOnInit(): void {
    this.VerificarDatosSesion();
  }

  VerificarDatosSesion(){
    let sesion = this.servicioSeguridad.ObtenerInformacionSesion().subscribe((datosSesion: ModeloDatos) =>{
    if (datosSesion) {
      sesion.id = datosSesion.id;
      sesion.correo = datosSesion.correo;

      //Buscar Persona
      this.servicioPersona.ObtenerRegistroPorId(sesion.id).subscribe((datos: ModeloPersona) => {
        this.fgValidador.controls["id"].setValue(sesion.id);
        this.fgValidador.controls["nombres"].setValue(datos.nombres);
        this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
        this.fgValidador.controls["identificacion"].setValue(datos.identificacion);
        this.fgValidador.controls["direccion"].setValue(datos.direccion);
        this.fgValidador.controls["correo"].setValue(datos.correo);
        this.fgValidador.controls["celular"].setValue(datos.celular);
        this.fgValidador.controls["rol"].setValue(datos.rol);
        this.fgValidador.controls["clave"].setValue(datos.clave);
      })

      //Editar Persona
      let nombres = this.fgValidador.controls["nombres"].value;
      let apellidos = this.fgValidador.controls["apellidos"].value;
      let identificacion = this.fgValidador.controls["identificacion"].value;
      let direccion = this.fgValidador.controls["direccion"].value;
      let correo = this.fgValidador.controls["correo"].value;
      let celular = this.fgValidador.controls["celular"].value;
      let rol = this.fgValidador.controls["rol"].value;
      let clave = this.fgValidador.controls["clave"].value;
  
      let p = new ModeloPersona();
      p.nombres = nombres;
      p.apellidos = apellidos;
      p.identificacion = identificacion;
      p.direccion = direccion;
      p.correo = correo;
      p.celular = celular;
      p.rol = rol;
      p.clave = clave;
      p.id = sesion;
  
      this.servicioPersona.ActualizarPersona(p).subscribe((datos: ModeloPersona) => {
        alert("Usuario actualizado");
        this.router.navigate(["/administracion/listar-personas"]);
      }, (error: any) => {
        alert("Error, usuario NO actualizado");
      })
    }
  })
  }

  CambiarClave() {
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();

    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos: any) => {
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"]);
      //alert("datos OK");
    }, (error: any) => {
      alert("Error de usuario");
    })
  }

  EditarPersona() {

  }

}
