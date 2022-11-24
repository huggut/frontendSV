import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit{

  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
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
      private router: Router,
      private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"];
      this.BuscarPersona();
    }

    BuscarPersona(){
      this.servicioPersona.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloPersona) => {
        this.fgValidador.controls["id"].setValue(this.id);
        this.fgValidador.controls["nombres"].setValue(datos.nombres);
        this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
        this.fgValidador.controls["identificacion"].setValue(datos.identificacion);
        this.fgValidador.controls["direccion"].setValue(datos.direccion);
        this.fgValidador.controls["correo"].setValue(datos.correo);
        this.fgValidador.controls["celular"].setValue(datos.celular);
        this.fgValidador.controls["rol"].setValue(datos.rol);
      })
    }
  
    EditarPersona(){
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
      p.id = this.id;
  
      this.servicioPersona.ActualizarPersona(p).subscribe((datos: ModeloPersona) => {
        alert("Usuario actualizado");
        this.router.navigate(["/administracion/listar-personas"]);
      }, (error: any) => {
        alert("Error, usuario NO actualizado");
      })
    }

}
