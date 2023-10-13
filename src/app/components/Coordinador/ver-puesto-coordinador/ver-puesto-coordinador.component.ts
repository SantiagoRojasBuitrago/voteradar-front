import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-ver-puesto-coordinador',
  templateUrl: './ver-puesto-coordinador.component.html',
  styleUrls: ['./ver-puesto-coordinador.component.scss'],
})
export class VerPuestoCoordinadorComponent implements OnInit {
  tabla: boolean = false;
  percent: number = 0;
  dataStations: any = [];
  
  searchForm: UntypedFormGroup = this.fb.group({
    puestos: [null],
  });
  dataStateStation: any = [];
  stateActual: any = {};

  constructor(private apiService: ApiService, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.getPuestos();
    this.tabla = true;
  }



  getPuestos() {
     
    this.apiService.getStationsTestigo().subscribe((resp: any) => {
      this.dataStations = this.dataStations.concat(resp);
     
      this.loadAllPuestosData();
    });
  }
  


  
  getNecesitadosPuesto(data: any, nombre: any) {
    this.apiService.getNecesitadosPuesto(data).subscribe((resp: any) => {
      const state = { nombre }; 
      this.dataStateStation = [resp];
      console.log(state)
     this.dataStateStation[0].nombre = state.nombre
      console.log(this.dataStateStation)
    });
  }

  

  createPercent(existentes: any, necesitados: any) {
    const percent = Math.round((existentes / necesitados) * 100) / 100;
    if (necesitados == 0) {
      return `(0%)`;
    }
    return `(${percent}%)`;
  }

  textColor(existentes: any, necesitados: any) {
    let percent = Math.round((existentes / necesitados) * 100) / 100;
    if (percent == 100) {
      return 'text-success';
    } else if (percent >= 0 && percent <= 50 && existentes < necesitados) {
      return 'text-danger';
    } else if (percent > 50 && percent < 100) {
      return 'text-warning';
    } else if (percent > 100) {
      return 'text-primary';
    } else {
      return 'text-success';
    }
  }

  getCode(item: any) {
    const { codigo_unico } = item;
    return codigo_unico;
  }

  getName(item: any) {
    const { nombre } = item.nombre;
    return nombre;
  }

  stateSeleccionado(state: any) {
    this.stateActual = state;
  }

  // ...

  getSelectedStation(item: any) {
    if (item) {
      const codigo_unico = this.getCode(item);
      const data = { puesto: codigo_unico };
      const nombre = item.nombre
      this.getNecesitadosPuesto(data, nombre);
    } else {
      // Si no se selecciona un puesto, cargar la información de todos los puestos.
      this.loadAllPuestosData();
    }
    this.tabla = true;
  }
  loadAllPuestosData() {
    this.dataStateStation = []; // Asegúrate de que dataStateStation esté vacío antes de cargar los datos.
    console.log(this.dataStations)
    const requests = this.dataStations.map((item: any) => {
     
      const codigo_unico = this.getCode(item);
      const data = { puesto: codigo_unico };
      const nombre = item.nombre
      return this.apiService.getNecesitadosPuesto(data).pipe(
        map((response: any) => ({ ...response, nombre })) // Agrega 'nombre' al objeto 'response'
      );
  
    });
  
    forkJoin(requests).subscribe((responses: any) => {
      this.dataStateStation = responses;
      console.log(this.dataStateStation)
    });
    
   
    
  }
  
  

}
