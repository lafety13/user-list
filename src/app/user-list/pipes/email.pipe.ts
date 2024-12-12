import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'email'
})
export class EmailPipe implements PipeTransform {
    transform(emails: string[]): any {
        return emails.join(', ');
    }
}
