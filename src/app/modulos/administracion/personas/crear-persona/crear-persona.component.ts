import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit{

  fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'identificacion': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'celular': ['', [Validators.required]],
    'rol': ['', [Validators.required]]
   });
  
    constructor(private fb: FormBuilder,
      private servicioPersona: PersonaService,
      private router: Router) { }
  
    ngOnInit(): void {
    }
  
    GuardarPersona(){
      let nombres = this.fgValidador.controls["nombres"].value;
      let apellidos = this.fgValidador.controls["apellidos"].value;
      let identificacion = this.fgValidador.controls["identificacion"].value;
      let direccion = this.fgValidador.controls["direccion"].value;
      let correo = this.fgValidador.controls["correo"].value;
      let celular = this.fgValidador.controls["celular"].value;
      let rol = this.fgValidador.controls["rol"].value;

      let p = new ModeloPersona();
      p.nombres = nombres;
      p.apellidos = apellidos;
      p.identificacion = identificacion;
      p.direccion = direccion;
      p.correo = correo;
      p.celular =celular;
      p.rol = rol;
  
      this.servicioPersona.CrearPersona(p).subscribe((datos: ModeloPersona) => {
        alert("Usuario agregado");
        this.router.navigate(["/administracion/listar-personas"]);
      }, (error: any) => {
        alert("Error Usuario NO agregado");
      })
    }
}
