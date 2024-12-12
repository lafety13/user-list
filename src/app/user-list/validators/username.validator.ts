import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function usernameValidator():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const validUsernamePattern = /^[A-Za-z0-9 ]+$/;
        if (control.value && !validUsernamePattern.test(control.value)) {
            return { invalidUsername: 'Invalid Username' };
        }
        return null;
    }
}
