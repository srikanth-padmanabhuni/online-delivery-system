import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { RedirectguardGuard } from './guards/redirectguard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate : [RedirectguardGuard] },
  { path: 'login', component: LoginComponent, canActivate : [RedirectguardGuard] },
  { path: 'register', component: RegisterComponent, canActivate : [RedirectguardGuard] }, 
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthguardGuard] },
  { path: 'cart', component: CartComponent, canActivate : [AuthguardGuard] },
  { path: 'orders', component: OrderComponent, canActivate : [AuthguardGuard] },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
