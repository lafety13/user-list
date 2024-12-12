import { Injectable } from '@angular/core';
import {Toast, ToastOptions} from "../components/models/toast.model";

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: Toast[] = [];

    show(text: string, options: ToastOptions = {} as ToastOptions): void {
        this.toasts.push(<Toast>{ text, ...options });
    }

    remove(toast: Toast): void {
        this.toasts = this.toasts.filter((t: Toast) => t !== toast);
    }

    clear(): void {
        this.toasts.splice(0, this.toasts.length);
    }
}
