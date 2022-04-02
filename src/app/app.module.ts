import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/Admin/admin-home/admin-home.component';
import { GerenteHomeComponent } from './components/Gerente/gerente-home/gerente-home.component';
import { SupervisorHomeComponent } from './components/Supervisor/supervisor-home/supervisor-home.component';
import { CoordinadorHomeComponent } from './components/Coordinador/coordinador-home/coordinador-home.component';
import { TestigoHomeComponent } from './components/Testigo/testigo-home/testigo-home.component';
import { MenuAdminComponent } from './components/Admin/menu-admin/menu-admin.component';
import { MenuGerenteComponent } from './components/Gerente/menu-gerente/menu-gerente.component';
import { MenuSupervisorComponent } from './components/Supervisor/menu-supervisor/menu-supervisor.component';
import { MenuCoordinadorComponent } from './components/Coordinador/menu-coordinador/menu-coordinador.component';
import { MenuTestigoComponent } from './components/Testigo/menu-testigo/menu-testigo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CrearGerenteComponent } from './components/Admin/crear-gerente/crear-gerente.component';
import { CrearSupervisorComponent } from './components/Gerente/crear-supervisor/crear-supervisor.component';
import { CrearCoordinadorComponent } from './components/Supervisor/crear-coordinador/crear-coordinador.component';
import { CrearTestigoComponent } from './components/Coordinador/crear-testigo/crear-testigo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditarGerenteComponent } from './components/Admin/editar-gerente/editar-gerente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    GerenteHomeComponent,
    SupervisorHomeComponent,
    CoordinadorHomeComponent,
    TestigoHomeComponent,
    MenuAdminComponent,
    MenuGerenteComponent,
    MenuSupervisorComponent,
    MenuCoordinadorComponent,
    MenuTestigoComponent,
    MenuTestigoComponent,
    CrearGerenteComponent,
    CrearSupervisorComponent,
    CrearCoordinadorComponent,
    CrearTestigoComponent,
    EditarGerenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }