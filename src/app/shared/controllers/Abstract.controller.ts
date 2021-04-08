import {AbstractControl, FormGroup} from '@angular/forms';

export abstract class AbstractController {
  protected isFormValid(form: FormGroup, debug = false): boolean {
    let valid = true;
    Object.keys(form.controls).forEach((key: string) => {
      form.controls[key].markAsTouched();
      if (form.controls[key].invalid) {
        valid = false;
      }

      // @ts-ignore
      if (form.controls[key].controls) {
        this.isFormValid(form.controls[key] as FormGroup);
      }

      if (debug && form.controls[key].invalid) {
        console.warn(key, form.controls[key]);
      }
    });

    return valid;
  }

  public isControlHasError(control: AbstractControl, validator: string): boolean {
    return control.hasError(validator) && control.touched;
  }

  public isControlInvalid(control: AbstractControl): boolean {
    return control.invalid;
  }

  protected trimSpaces(data: string): string {
    return data.replace(/ /gm, '');
  }
}
