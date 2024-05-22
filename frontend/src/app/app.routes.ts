import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NegocioComponent } from './components/negocio/negocio.component';
import { ShoppingComponent } from './components/shopping/shopping.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'negocio', component: NegocioComponent },
  { path: 'shopping', component: ShoppingComponent },
];
