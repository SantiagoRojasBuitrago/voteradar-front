import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-consultar-gerente',
  templateUrl: './consultar-gerente.component.html',
  styleUrls: ['./consultar-gerente.component.scss']
})
export class ConsultarGerenteComponent implements OnInit {

  listGerenteAsignados: any = [];
  listGerenteNoAsignados: any = [];
  listMunicipals:any=[];

  constructor(private apiService: ApiService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.getGerentes();
  }

  getGerentes() {

    this.apiService.getAssignedMunicipal().subscribe((resp: any) => {
      const { gerentes_asignados, gerentes_no_asignados } = resp;
        this.listGerenteAsignados=gerentes_asignados;
        this.listGerenteNoAsignados=gerentes_no_asignados;
        for (let gerente of this.listGerenteAsignados) {
          let municipios=this.getMunicipals(gerente.municipios);
          this.listMunicipals.push(municipios.join(', '));
        }
    }, (err: any) => {
      this.alertService.errorAlert(err.message);
    });
  }

  getMunicipals(data: any) {
    return data.map((municipal: any) => {
      const { nombre } = municipal;
      return nombre;
    });
  }

}
