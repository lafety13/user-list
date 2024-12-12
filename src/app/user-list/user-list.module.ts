import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import {RouterModule} from "@angular/router";
import { UserFormComponent } from './components/user-form/user-form.component';
import { CreateUserModalComponent } from './components/create-user-modal/create-user-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastModule} from "../shared/toast/toast.module";
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {UtilsModule} from "../shared/utils/utils.module";
import {EmailPipe} from "./pipes/email.pipe";

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    CreateUserModalComponent,
    EditUserComponent,
    EmailPipe
  ],
  imports: [
    CommonModule,
    NgbAlertModule,
    ReactiveFormsModule,
    ToastModule,
    UtilsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'edit/:id',
        component: EditUserComponent
      }
    ])
  ]
})
export class UserListModule { }
