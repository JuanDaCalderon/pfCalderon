import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOutGuard } from './guards/log-out.guard';
import { LoginGuard } from './guards/login.guard';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: LoginComponent,
    canActivate: [LogOutGuard]
  },
  {
    pathMatch: 'full',
    path: 'login',
    component: LoginComponent,
    canActivate: [LogOutGuard]
  },
  {
    pathMatch: 'full',
    path: 'signup',
    component: SignupComponent,
    canActivate: [LogOutGuard]
  },
  {
    path: "alumnos",
    loadChildren: () =>import("./alumnos/alumnos.module").then(m => m.AlumnosModule),
    canActivate: [LoginGuard]
  },
  {
    path: "clases",
    loadChildren: () =>import("./clases/clases.module").then(m => m.ClasesModule),
    canActivate: [LoginGuard]
  },
  {
    path: "cursos",
    loadChildren: () =>import("./cursos/cursos.module").then(m => m.CursosModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
