import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Custom validation methods for forms.
 */
export default class Validation {
  /**
   * Checks whether or not two strings are equal.
   * @param controlName The name of a form's FormControl.
   * @param checkControlName The name of the FormControl to check against `controlName`.
   * @returns The `matching` property is set to `true` if `checkControlName` equals `controlName`. 
   * Returns `null` otherwise.
   */
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (control == null || checkControl == null) {
        return null; 
      }

      if (checkControl.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control.value !== checkControl.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
