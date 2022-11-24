import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-eliminar-persona',
  templateUrl: './eliminar-persona.component.html',
  styleUrls: ['./eliminar-persona.component.css']
})
export class EliminarPersonaComponent {
  id: string = '';

  constructor(private servicioPersona: PersonaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.EliminarPersona();
  }

  EliminarPersona(){
    this.servicioPersona.EliminarPersona(this.id).subscribe((datos: any) => {
      this.router.navigate(["/administracion/listar-personas"]);
    })
  }
}
