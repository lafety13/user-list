import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import {CreateUserPayload, MOCK_USER_DATA, User} from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class UserListService {
    getUsers(): Observable<User[]> {
        return of(MOCK_USER_DATA).pipe(delay(this.getRequestDelay()));
    }

    getUserById(id: number): Observable<User | null> {
        return of(MOCK_USER_DATA.find(item => item.id === id) || null).pipe(delay(this.getRequestDelay()));
    }

    addUser(item: CreateUserPayload): Observable<User> {
        return of({ ...item, id: MOCK_USER_DATA.length + 1 } as User).pipe(
            delay(this.getRequestDelay()),
            switchMap((newItem: User) => {
                MOCK_USER_DATA.push(newItem);
                return of(newItem);
            })
        );
    }

    deleteUser(id: number): Observable<boolean> {
        return of(true).pipe(
            delay(this.getRequestDelay()),
            switchMap(() => {
                const index = MOCK_USER_DATA.findIndex(item => item.id === id);
                if (index !== -1) {
                    MOCK_USER_DATA.splice(index, 1);
                    return of(true);
                }
                return of(false);
            })
        );
    }

    private getRequestDelay(): number {
        return Math.random() * 2000 + 500;
    }
}
