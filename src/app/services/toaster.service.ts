import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
} 

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private toasts: Toast[] = [];
  toastsSignal = signal(this.toasts);

  constructor() {}

  showToast(message: string, type: 'success' | 'error' | 'info', duration: number = 3000): void {
    console.log("in show toast")
    const toast: Toast = { message, type, duration };
    this.toasts.push(toast);
    this.toastsSignal.set([...this.toasts]);

    setTimeout(() => {
      this.removeToast(toast);
    }, duration);
  }

  private removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastsSignal.set([...this.toasts]);
  }
}
