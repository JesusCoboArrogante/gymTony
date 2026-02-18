import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ValidationError } from "@angular/forms/signals";

export class ValidacionPropia {
    static validarTelefono(control: AbstractControl): ValidationErrors | null{
        if (!control.value) return null;
        const telefono = /^[6789]\d{8}$/;

        if (!telefono.test(control.value)) {
            return {validarTelefono: true}
        }

        return null
    }

    static validarDirrecion(control: AbstractControl): ValidationErrors | null{
        if (!control.value) return null;
        const tipo = ["calle", "avenida", "paseo", "plaza", "via"]
        let direccion = control.value.trim()

        let primeraPalabra = direccion.split(' ')[0];
        console.log(tipo[0])


        for (let i = 0; i < tipo.length; i++) {
        
            if (primeraPalabra == tipo[i]) {
                return null
            }
        }

        return {validarDirrecion:true}
    }

    static validarEmail(control: AbstractControl): ValidationErrors | null{
        if(!control.value) return null;
        const correo =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!correo.test(control.value)) {
            return {validarEmail: true}
        }

        return null;
    }

    static validarPassword(control: AbstractControl): ValidationErrors | null{

        const passCtrl = control.get('password');
        const repCtrl  = control.get('repetPassword');

        if (!passCtrl || !repCtrl) return null;

        const pass = passCtrl.value;
        const rep  = repCtrl.value;

        if (pass !== rep) {
            return {validarPassword: true}
        }

        return null
    }

    

    

    
}
