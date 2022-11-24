import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadorSesionGuard implements CanActivate {

  constructor(private servicioSeguridad: SeguridadService,
    private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.servicioSeguridad.ObtenerInformacionSesion()){
      console.log("si hay datos");
      return true;
    }else{
      this.router.navigate(['/inicio']);
      console.log("no hay datos");
      return false;
    }
  }
  
}
