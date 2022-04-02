import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-crear-testigo',
  templateUrl: './crear-testigo.component.html',
  styleUrls: ['./crear-testigo.component.scss']
})
export class CrearTestigoComponent implements OnInit {

  testigo: any = {
    rol_id: 5,
    tipo_documento_id: '',
    numero_documento: '',
    estado_id: 1,
    genero_id: '',
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    cliente_id: 1,
  }

  constructor(private apiService: ApiService) { }

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mesa 1' },
      { item_id: 2, item_text: 'Mesa 2' },
      { item_id: 3, item_text: 'Mesa 3' },
      { item_id: 4, item_text: 'Mesa 4' },
      { item_id: 5, item_text: 'Mesa 5' }
    ];
    this.dropdownSettings = {
      enableCheckAll: false,
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      searchPlaceholderText: "Buscar",
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  createTestigo() {
    console.log(this.testigo);
    this.apiService.createUser(this.testigo).subscribe((resp: any) => {
      console.log(resp);
      const { res, message } = resp;
      if (res == true) {
        Swal.fire(message)
      } else {
        console.log(resp);
        console.log("Algo salio mal")
        Swal.fire('La Contraseña o el Usuario son equivocados')
      }
    }, err => console.log(err));
  }

}