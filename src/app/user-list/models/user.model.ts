import {FormArray, FormControl} from "@angular/forms";

export interface User {
    id: number;
    name: string;
    email: string[];
}

export const MOCK_USER_DATA: User[] = [
    { id: 1, name: 'Item 1', email: ['email 1'] },
    { id: 2, name: 'Item 2', email: ['email 2'] },
    { id: 3, name: 'Item 3', email: ['email 3'] },
];

export interface CreateUserPayload {
    name: string;
    email: string[];
}

export interface EmailFormGroup {
    name: FormControl<string>;
}

export interface UserFormGroup {
    name: FormControl<string>;
    email: FormArray<FormControl<string>>;
}

export interface UserFormGroupValues {
    name: string;
    email: string[];
}
