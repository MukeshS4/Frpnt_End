import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor() { }
  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }
      const regex = new RegExp('.{1,}$');
      const valid = regex.test(control.value);
      return valid ? null as any: { invalidName: true };
    };
 }
}
