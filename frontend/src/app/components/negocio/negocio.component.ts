import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import * as Aos from 'aos';

@Component({
  selector: 'app-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './negocio.component.html',
  styleUrl: './negocio.component.css',
})
export class NegocioComponent implements OnInit {
  empresa: Empresa = {
    nombre: '',
    direccion: '',
    horario: '',
    email: '',
    telefono: '',
    tipo: '',
    logo: '',
  };

  empresas: Empresa[] = [];

  constructor(private service: EmpresaService) {}

  ngOnInit(): void {
    Aos.init();
    this.service.findAll().subscribe((AllEmpresas) => {
      console.log('ALl Empresas: ', AllEmpresas);
      this.empresas = AllEmpresas;
    });
  }

  onCreate() {
    this.service.create(this.empresa).subscribe(
      (item) => {
        console.log('Empresa: ', item);
        Swal.fire({
          title: 'Empresa registrada',
          text: 'Empresa ' + this.empresa.nombre + ' registrada con éxito',
          icon: 'success',
        });
        this.empresa = {
          nombre: '',
          direccion: '',
          horario: '',
          email: '',
          telefono: '',
          tipo: '',
          logo: '',
        };
        this.service.findAll().subscribe((empresas) => {
          this.empresas = empresas;
        });
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  onDelete(id: number) {
    this.service.eliminar(id).subscribe(
      (response) => {
        console.log('Empresa was deleted', response);
      },
      (error) => {
        console.log('On Delete Error: ', error);
        Swal.fire({
          title: 'Empresa eliminada',
          text: 'Empresa ' + this.empresa.nombre + ' eliminada con éxito',
          icon: 'success',
        });
        this.service.findAll().subscribe((empresas) => {
          this.empresas = empresas;
        });
      }
    );
  }
}
