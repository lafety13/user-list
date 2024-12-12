import { Directive, Input, HostBinding } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Directive({
    selector: '[appError]',
    exportAs: 'appError'
})
export class ErrorDirective {
    @Input() errorControl: AbstractControl | null = null;

    @HostBinding('class.is-invalid')
    get isInvalid(): boolean {
        return !!this.errorControl && this.errorControl.invalid && this.errorControl.touched;
    }
}
