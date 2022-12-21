import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CascaronComponent } from './cascaron/cascaron.component';
import { ImportarNomencladoresComponent } from './importar-nomencladores/importar-nomencladores.component';
import { GeneradorComponent } from './generador/generador.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { ConexionDBComponent} from './conexion-db/conexion-db.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cascaron/:id', component: CascaronComponent },
  { path: 'importar-nomencladores', component: ImportarNomencladoresComponent },
  { path: 'generador', component: GeneradorComponent },
  { path: 'gestionusuarios', component:GestionUsuariosComponent }
  
  // { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RutasComponentes = [
  LoginComponent,
  CascaronComponent,
  ImportarNomencladoresComponent,
  GeneradorComponent,
  GestionUsuariosComponent,
  ConexionDBComponent]
