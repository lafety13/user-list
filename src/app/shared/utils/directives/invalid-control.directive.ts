import { Directive, Input, HostBinding } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
    selector: '[invalidControl]',
    exportAs: 'invalidControl'
})
export class InvalidControlDirective {
    @Input('invalidControl') errorControl: AbstractControl | null = null;

    @HostBinding('class.is-invalid')
    get isInvalid(): boolean {
        return !!this.errorControl && this.errorControl.invalid && this.errorControl.touched;
    }
}
