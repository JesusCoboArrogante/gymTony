import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

type Resumen = {
  nombre: string;
  telefono: string;
  dirreccion: string;
  email: string;
  genero: 'H' | 'M';
  actividad: 'P' | 'Z' | 'T';
};

@Component({
  selector: 'app-resumen-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './resumen-dialog.html',
  styleUrls: ['./resumen-dialog.css']
})
export class ResumenDialogComponent {
  private dialogRef = inject(MatDialogRef<ResumenDialogComponent>);
  data = inject<Resumen>(MAT_DIALOG_DATA);

  cerrar() {
    this.dialogRef.close();
  }
}
