import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { CustomValidationService } from '../../../services/custom-validation.service';

@Component({
  selector: 'app-crear-coordinador',
  templateUrl: './crear-coordinador.component.html',
  styleUrls: ['./crear-coordinador.component.scss']
})
export class CrearCoordinadorComponent implements OnInit {

  dropdownSettingsZones: IDropdownSettings = {};
  dropdownSettingsStations: IDropdownSettings = {};
  dataZones: any = [];
  dataStations: any = [];
  dataFiltered: any = [];

  createForm: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    genero_id: [null, Validators.required],
    tipo_documento_id: [null, Validators.required],
    numero_documento: ['', Validators.required],
    telefono: [''],
    email: ['', [Validators.required, Validators.email, this.customValidator.patternValidator()]],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    zona: [[], Validators.required],
    puestos: [[]],
  });

  constructor(private apiService: ApiService, private fb: FormBuilder, private alertService: AlertService, private customValidator: CustomValidationService) { }

  ngOnInit() {
    this.getZonesSupervisor();
  }

  getSelectedValue(item: any) {
    this.createForm.patchValue({
      puestos: [],
    });
    if (item) {
      this.getStationCoordinador(item.codigo_unico)
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
        this.apiService.createCoordinador(this.createForm.value).subscribe((resp: any) => {

          this.alertService.successAlert(resp.message);

        }, (err: any) => {
          this.alertService.errorAlert(err.message);
        })
      } else {
        this.alertService.errorAlert("Llene los campos obligatorios.");
      }

    }
  }


  getZonesSupervisor() {
    this.apiService.getZonesSupervisor().subscribe((resp: any) => {
      this.dataZones = resp;
    }, (err: any) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    })
  }

  getStationCoordinador(data:any) {
    this.apiService.getStationsCoordinador().subscribe((resp: any) => {
      this.dataStations = resp.filter((dataStation: any) => dataStation.codigo_zona_votacion == data);
    }, (err: any) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    })
  }

}
