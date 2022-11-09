import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './shared/material.module';
import { LoaderComponent } from './shared/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewAllCompaniesComponent } from './components/view-all-companies/view-all-companies.component';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import { LoginComponent } from './components/login/login.component';
import { SearchCompanyComponent } from './components/search-company/search-company.component';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    RegisterCompanyComponent,
    HomeComponent,
    ViewAllCompaniesComponent,
    ViewCompanyComponent,
    LoginComponent,
    SearchCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
