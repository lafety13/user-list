import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User, UserFormGroup} from "../../models/user.model";
import {FormGroup} from "@angular/forms";
import {UserListService} from "../../services/user-list.service";
import {rxState} from "@rx-angular/state";
import {rxActions} from "@rx-angular/state/actions";
import {catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RxActions} from "@rx-angular/state/actions/lib/types";
import {RxState} from "@rx-angular/state/lib/rx-state";

interface EditUserComponentState {
  user: User | null;
  loading: boolean;
}

interface EditUserComponentActions {
  getUserById: number;
  save: User;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit {
  actions = rxActions<EditUserComponentActions>()
  state = rxState<EditUserComponentState>();
  user$: Observable<User | null> = this.state.select('user');
  loading$: Observable<boolean> = this.state.select('loading');

  get userId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  private getUserByIdEffect$: Observable<EditUserComponentState> = this.actions.getUserById$.pipe(
      switchMap(() => this.userListService.getUserById(this.userId).pipe(
          map((user: User | null) => ({ user, loading: false })),
          startWith({ loading: true, user: null }),
          catchError(() => of({ loading: false, user: null }))
      ))
  );
  private saveEffect$: Observable<Partial<EditUserComponentState>> = this.actions.save$.pipe(
      switchMap((user: User) => this.userListService.addUser(user).pipe(
          map((user: User | null) => ({ user, loading: false })),
          startWith({ loading: true }),
          catchError(() => of({ loading: false }))
      )),
  )

  constructor(
      private userListService: UserListService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
    this.state.connect(this.getUserByIdEffect$)
    this.state.connect(this.saveEffect$)
  }

  ngOnInit(): void {
    this.actions.getUserById(this.userId);
  }

  save(form: FormGroup<UserFormGroup>): void {
    this.actions.save(<User>{
      id: this.userId,
      ...form.value
    });
  }

  backToList(): void {
    this.router.navigateByUrl('/');
  }
}
