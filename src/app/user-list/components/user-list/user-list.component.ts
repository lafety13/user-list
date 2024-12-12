import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserListService} from "../../services/user-list.service";
import {rxState} from "@rx-angular/state";
import {CreateUserPayload, User, UserFormGroupValues} from "../../models/user.model";
import {rxActions} from "@rx-angular/state/actions";
import {catchError, endWith, map, Observable, of, startWith} from "rxjs";
import {switchMap} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUserModalComponent} from "../create-user-modal/create-user-modal.component";
import {ToastService} from "../../../shared/toast/services/toast.service";
import {Router} from "@angular/router";

interface UserListComponentState {
  collection: User[];
  loading: boolean;
}

interface UserListComponentActions {
  getAll: void;
  add: CreateUserPayload;
  delete: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  private actions = rxActions<UserListComponentActions>();
  private state = rxState<UserListComponentState>();
  private getAllEffect$: Observable<Partial<UserListComponentState>> = this.actions.getAll$.pipe(
      switchMap(() => this.userListService.getUsers().pipe(
          map((users: User[]) => ({ collection: users })),
          startWith({ loading: true }),
          endWith({ loading: false }),
      )),
      catchError(() => of({ loading: false }))
  )
  private addEffect$: Observable<Partial<UserListComponentState>> = this.actions.add$.pipe(
      switchMap((user: UserFormGroupValues) => this.userListService.addUser(user).pipe(
          switchMap(() => this.userListService.getUsers()),
          map((users: User[]) => ({ collection: users, loading: false })),
          startWith({ loading: true }),
          catchError(() => of({ loading: false }))
      )),
  )
  private removeEffect$: Observable<Partial<UserListComponentState>> = this.actions.delete$.pipe(
      switchMap((id: number) => this.userListService.deleteUser(id).pipe(
          switchMap(() => this.userListService.getUsers()),
          map((users: User[]) => ({ collection: users, loading: false })),
          startWith({ loading: true }),
          catchError(() => of({ loading: false }))
      )),
  )
  users$: Observable<User[]> = this.state.select('collection');
  loading$: Observable<boolean> = this.state.select('loading');

  constructor(
      private userListService: UserListService,
      private ngbModal: NgbModal,
      private toastService: ToastService,
      private router: Router
  ) {
    this.state.connect(this.getAllEffect$);
    this.state.connect(this.addEffect$);
    this.state.connect(this.removeEffect$);
  }

  ngOnInit(): void {
    this.actions.getAll();
  }

  onCreate(): void {
    this.ngbModal
        .open(CreateUserModalComponent)
        .result
        .then((result) => {
          this.actions.add(result)
        })
        .catch(() => {
          this.toastService.show('Something went wrong!')
        });
  }

  onEdit(user: User): void {
    this.router.navigate(['edit', user.id])
  }

  onRemove(id: number): void {
    this.actions.delete(id);
  }
}
