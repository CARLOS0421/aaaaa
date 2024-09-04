import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

interface Estudiante {
  nombre: string;
  asistencia: string;
  clasesAsistidas: number; // Contador de clases asistidas
  estado: string; // Estado de reprobado
}

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  estudiantes: Estudiante[] = [
    { nombre: 'Ricardo Muñoz', asistencia: '', clasesAsistidas: 0, estado: '' },
    { nombre: 'Sofia Vergara', asistencia: '', clasesAsistidas: 0, estado: '' },
    { nombre: 'Rodrigo Sandoval', asistencia: '', clasesAsistidas: 0, estado: '' },
    { nombre: 'Omar Carvajal', asistencia: '', clasesAsistidas: 0, estado: '' },
    { nombre: 'Antonia Perez', asistencia: '', clasesAsistidas: 0, estado: '' },
    { nombre: 'Andrea Martinez', asistencia: '', clasesAsistidas: 0, estado: '' },
    { nombre: 'Freddy Palma', asistencia: '', clasesAsistidas: 0, estado: '' }
  ];

  constructor() { }

  ngOnInit() {}

  marcarAsistencia(estudiante: Estudiante, estado: string) {
    estudiante.asistencia = estado;
    estudiante.clasesAsistidas += 1; // Incrementa el contador de clases asistidas
  }

  calcularPorcentaje(tipo: string): number {
    const total = this.estudiantes.length;
    const cantidad = this.estudiantes.filter(estudiante => estudiante.asistencia === tipo).length;
    return total > 0 ? (cantidad / total) * 100 : 0;
  }

  get porcentajePresente(): number {
    return this.calcularPorcentaje('Presente');
  }

  get porcentajeAusente(): number {
    return this.calcularPorcentaje('Ausente');
  }

  get mensajeAsistencia(): string {
    const porcentajePresente = this.porcentajePresente;
    return porcentajePresente < 40 ? 'Baja asistencia' : 'Asistencia adecuada';
  }

  guardarAsistencia() {
    this.estudiantes.forEach(estudiante => {
      const porcentajeAsistencia = this.calcularPorcentaje('Presente') / (estudiante.clasesAsistidas || 1) * 100;
      estudiante.estado = porcentajeAsistencia < 60 ? 'REPROBADO POR ASISTENCIA' : 'Aprobado';
    });
  }

  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
  }
}
