import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserFormGroup, UserFormGroupValues} from "../../models/user.model";
import {usernameValidator} from "../../validators/username.validator";
import {atLeastOneEmailValidator} from "../../validators/at-least-one-email.validator";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  @Input() set data(data: UserFormGroupValues | null) {
    if (data) {
      this.updateForm(data);
    }
  }

  formGroup: FormGroup<UserFormGroup> = this.fb.group<UserFormGroup>({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(100),
      usernameValidator()
    ]),
    email: this.fb.array<FormControl<string>>([this.getEmailControl('')], [atLeastOneEmailValidator()])
  });

  get emailFormArray() {
    return (this.formGroup.get('email') as FormArray).controls
  }

  constructor(private fb: FormBuilder) {}

  addEmail(): void {
    const emailArray = this.formGroup.get('email') as FormArray<FormControl<string>>;
    emailArray.push(this.getEmailControl(''));
  }

  removeEmail(index: number): void {
    const emailArray = this.formGroup.get('email') as FormArray<FormControl<string>>;
    emailArray.removeAt(index);
  }

  private updateForm(data: UserFormGroupValues): void {
    this.formGroup.patchValue({ name: data.name });
    const emailArray = this.formGroup.get('email') as FormArray<FormControl<string>>;
    emailArray.clear();
    data.email.forEach((email: string) => {
      emailArray.push(this.getEmailControl(email));
    });
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  private getEmailControl(email: string): FormControl<string> {
    return this.fb.nonNullable.control(email, [Validators.email])
  }
}
