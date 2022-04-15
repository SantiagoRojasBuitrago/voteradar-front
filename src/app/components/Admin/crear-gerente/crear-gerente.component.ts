import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-crear-gerente',
  templateUrl: './crear-gerente.component.html',
  styleUrls: ['./crear-gerente.component.scss']
})
export class CrearGerenteComponent implements OnInit {

  dataMunicipals: any = [];
  dataDepartments: any = [];

  createForm: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    genero_id: [null, Validators.required],
    tipo_documento_id: [null, Validators.required],
    numero_documento: ['', Validators.required],
    telefono: [''],
    email: ['', [Validators.required, Validators.email,this.customValidator.patternValidator()]],
    password: ['', Validators.compose([Validators.required,Validators.minLength(8)])],
    municipios: [[]],
  }
  )
  submitted = false;

  constructor(private apiService: ApiService, private fb: FormBuilder, private alertService: AlertService, private customValidator: CustomValidationService) { }

  ngOnInit() {
    this.getDepartmentAdmin();

  }

  getSelectedValue(item: any) {
    this.createForm.patchValue({
      municipios: [],
    });
    if (item) {
      this.getMunicipalAdmin(item.codigo_unico)
    } else {
      this.dataMunicipals = [];
    }
  }

  get createFormControl() {
    return this.createForm.controls;
  }

  onSubmit() {
    console.log(this.createFormControl['password'].errors?.['minlength']['actualLength'])
    this.submitted = true;
    if (this.createForm.valid) {
      console.log(this.createForm.value)
      this.apiService.createGerente(this.createForm.value).subscribe((resp: any) => {

        this.alertService.successAlert(resp.message);

      }, (err: any) => {
        this.alertService.errorAlert(err.message);
      })
    } else {
      this.alertService.errorAlert("Llene los campos obligatorios.");
    }
  }

  getDepartmentAdmin() {
    this.apiService.getDepartmentAdmin().subscribe((resp: any) => {
      this.dataDepartments = resp;
    }, (err: any) => {
      this.alertService.errorAlert(err.message);
    })
  }

  getMunicipalAdmin(data: any) {
    this.apiService.getMunicipalAdmin().subscribe((resp: any) => {
      this.dataMunicipals = resp.filter((dataMunicipal: any) => dataMunicipal.codigo_departamento_votacion == data);
    }, (err: any) => {
      this.alertService.errorAlert(err.message);
    });
  }

}
