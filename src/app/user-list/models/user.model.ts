import {FormArray, FormControl} from "@angular/forms";

export interface User {
    id: number;
    name: string;
    email: string[];
}

export const MOCK_USER_DATA: User[] = [
    { id: 1, name: 'Username1', email: ['email 1'] },
    { id: 2, name: 'Username2', email: ['email@gmail.com'] },
    { id: 3, name: 'Username3', email: ['email2@gmail.com', 'email3@gmail.com'] },
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
