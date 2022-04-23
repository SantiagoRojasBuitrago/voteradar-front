import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-ver-puesto-admin',
  templateUrl: './ver-puesto-admin.component.html',
  styleUrls: ['./ver-puesto-admin.component.scss']
})
export class VerPuestoAdminComponent implements OnInit {

  showLoading: boolean = false;
  tabla: boolean = false;
  dataDepartments: any = [];
  gerentes: any = {}
  supervisores: any = {};
  coordinadores: any = {};
  testigos: any = {};

  constructor(private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit() {
    this.getDepartmentAdmin();
  }

  getSelectedDepartment(item: any) {
    if (item) {
      const codigo_unico = this.getCode(item);
      const data = { departamento: codigo_unico };
      this.getNecesitadosDepartamento(data);
      this.tabla = true;
    } else {
      this.tabla = false;
    }
  }

  getDepartmentAdmin() {
    this.showLoading = true;
    this.apiService.getDepartmentAdmin().subscribe((resp: any) => {
      this.showLoading = false;
      this.dataDepartments = resp;
    }, (err: any) => {
      this.showLoading = false;
      this.alertService.errorAlert(err.message);
    })
  }

  getNecesitadosDepartamento(data: any) {
    this.showLoading = true;
    this.apiService.getNecesitadosDepartamento(data).subscribe((resp: any) => {
      this.showLoading = false;
      console.log(resp)
      this.gerentes = resp.gerentes;
      this.supervisores = resp.supervisores;
      this.coordinadores = resp.coordinadores;
      this.testigos = resp.testigos;
      this.tabla = true;
    }, (err: any) => {
      this.showLoading = false;
      this.alertService.errorAlert(err.message);
    })
  }

  textColor(existentes: any, necesitados: any) {
    if (existentes == necesitados) {
      return 'text-success';
    } else if (existentes < necesitados) {
      return 'text-primary';
    } else {
      return 'text-danger'
    }
  }

  createPercent(existentes: any, necesitados: any) {
    const percent = (existentes / necesitados) * 100;
    if (necesitados == 0) {
      return '(0%)';
    }
    return `(${Math.round(percent * 100) / 100}%)`;
  }

  validObjects() {
    if ((Object.keys(this.gerentes).length !== 0) && (Object.keys(this.supervisores).length !== 0) && (Object.keys(this.coordinadores).length !== 0) && (Object.keys(this.testigos).length !== 0)) {
      return true;
    }
    return false;
  }

  getCode(item: any) {
    const { codigo_unico } = item;
    return codigo_unico;
  }

}
