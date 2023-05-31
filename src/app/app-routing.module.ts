import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path:'app',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
