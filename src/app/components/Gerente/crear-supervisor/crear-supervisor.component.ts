import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { CustomValidationService } from '../../../services/custom-validation.service';

@Component({
  selector: 'app-crear-supervisor',
  templateUrl: './crear-supervisor.component.html',
  styleUrls: ['./crear-supervisor.component.scss']
})
export class CrearSupervisorComponent implements OnInit {

  dataZones: any = [];
  dataMunicipals: any = [];

  createForm: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    genero_id: [null, Validators.required],
    tipo_documento_id: [null, Validators.required],
    numero_documento: ['', Validators.required],
    telefono: [''],
    email: ['', [Validators.required, Validators.email, this.customValidator.patternValidator()]],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    municipio: [[], Validators.required],
    zonas: [[]],
  });

  constructor(private apiService: ApiService, private fb: FormBuilder, private alertService: AlertService, private customValidator: CustomValidationService) { }

  ngOnInit() {
    this.getMunicipalGerente();
  }

  getSelectedValue(item: any) {
    this.createForm.patchValue({
      zonas: [],
    });
    if (item) {
      this.getZoneGerente(item.codigo_unico)
    } else {
      this.dataZones = [];
    }
  }

  get createFormControl() {
    return this.createForm.controls;
  }

  get keypressValidator() {
    return this.customValidator;
  }

  onSubmit() {
    console.log(this.createForm.value)
    if ((!this.createFormControl['email'].errors?.['email'] || !this.createFormControl['email'].errors?.['invalidEmail']) && !this.createFormControl['password'].errors?.['minlength']) {

      if (this.createForm.valid) {
        console.log(this.createForm.value)
        this.apiService.createSupervisor(this.createForm.value).subscribe((resp: any) => {

          this.alertService.successAlert(resp.message);

        }, (err: any) => {
          this.alertService.errorAlert(err.message);
        })
      } else {
        this.alertService.errorAlert("Llene los campos obligatorios.");
      }

    }
  }

  getZoneGerente(data: any) {
    this.apiService.getZoneGerente().subscribe((resp: any) => {
      this.dataZones = resp.filter((dataZone: any) => dataZone.codigo_municipio_votacion == data);
    }, (err: any) => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
    }));
  }

  getMunicipalGerente() {
    this.apiService.getMunicipalGerente().subscribe(resp => {
      this.dataMunicipals = resp;
    }, (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

}
