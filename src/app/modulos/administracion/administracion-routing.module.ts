import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { BuscarSolicitudComponent } from './solicitudes/buscar-solicitud/buscar-solicitud.component';
import { CrearSolicitudComponent } from './solicitudes/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitudes/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitudes/eliminar-solicitud/eliminar-solicitud.component';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';

const routes: Routes = [
  {
    path: 'listar-personas',
    component: BuscarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-persona',
    component: CrearPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-persona/:id',
    component: EditarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-persona/:id',
    component: EliminarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-vehiculos',
    component: BuscarVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-vehiculo',
    component: CrearVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-vehiculo/:id',
    component: EditarVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-vehiculo/:id',
    component: EliminarVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-solicitudes',
    component: BuscarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-solicitud',
    component: CrearSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-solicitud/:id',
    component: EditarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-solicitud/:id',
    component: EliminarSolicitudComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
