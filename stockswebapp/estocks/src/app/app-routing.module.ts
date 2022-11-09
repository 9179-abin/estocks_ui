import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { HomeComponent } from './components/home/home.component';
import { ViewAllCompaniesComponent } from './components/view-all-companies/view-all-companies.component';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterCompanyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies',
    component: ViewAllCompaniesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies/:companyCode',
    component: ViewCompanyComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
