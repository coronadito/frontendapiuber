import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { EstacionesService } from 'src/app/servicios/estaciones.service';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private rutaService: RutasService,
    private estacionService: EstacionesService,
    private router: Router) { }

  listadoEstaciones: EstacionModelo[] = []

  fgValidacion = this.fb.group({
      tiempo_estimado: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      
    });

  getAllEstaciones(){
      this.estacionService.getAll().subscribe((data: EstacionModelo[]) => {
        this.listadoEstaciones = data
        console.log(data)
      })
    }
  
  

  ngOnInit(): void {
    this.getAllEstaciones()
  }

  store(){
    let ruta = new RutaModelo();
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;
    ruta.origen = this.fgValidacion.controls["origen"].value;
    ruta.destino = this.fgValidacion.controls["destino"].value;
 
    this.rutaService.store(ruta).subscribe((data: RutaModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
