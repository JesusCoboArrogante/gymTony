import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

import { ValidacionPropia } from './validacion-propia';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResumenDialogComponent } from './resumen-dialog/resumen-dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private dialog: MatDialog) {}

  private samePasswordValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const p1 = group.get('password')?.value ?? '';
    const p2 = group.get('repetPassword')?.value ?? '';
    if (!p1 || !p2) return null;
    return p1 === p2 ? null : { validarPassword: true };
  };

  gymTony = new FormGroup({
    datosPersonales: new FormGroup(
      {
        nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
        telefono: new FormControl('', [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          ValidacionPropia.validarTelefono
        ]),
        dirreccion: new FormControl('', [Validators.required, ValidacionPropia.validarDirrecion]),
        email: new FormControl('', [Validators.required, ValidacionPropia.validarEmail]),
        password: new FormControl('', [Validators.required]),
        repetPassword: new FormControl('', [Validators.required])
      },
      { validators: [this.samePasswordValidator] }
    ),
    datosExtra: new FormGroup({
      actividad: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    })
  });

  get datosPersonales(): FormGroup {
    return this.gymTony.get('datosPersonales') as FormGroup;
  }

  get datosExtra(): FormGroup {
    return this.gymTony.get('datosExtra') as FormGroup;
  }

  nextFromStep1(stepper: MatStepper) {
    this.datosPersonales.markAllAsTouched();
    this.datosPersonales.updateValueAndValidity();
    if (this.datosPersonales.valid) stepper.next();
  }

  inscribirse() {
    this.gymTony.markAllAsTouched();
    this.gymTony.updateValueAndValidity();

    if (this.gymTony.invalid) return;

    const v = this.gymTony.getRawValue();

    this.dialog.open(ResumenDialogComponent, {
      width: '420px',
      data: { ...v.datosPersonales, ...v.datosExtra }
    });
  }
}
