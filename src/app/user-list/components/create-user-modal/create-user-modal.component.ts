import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {UserFormGroup} from "../../models/user.model";

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirm(form: FormGroup<UserFormGroup>): void {
    this.activeModal.close(form.getRawValue());
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
