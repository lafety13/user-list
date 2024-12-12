import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function atLeastOneEmailValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
        if (!formArray || !formArray.value || !Array.isArray(formArray.value)) {
            return null;
        }

        const hasAtLeastOne = formArray.value.some((email: string) => email && email.trim() !== '');
        return hasAtLeastOne ? null : { atLeastOneEmail: true };
    };
}
