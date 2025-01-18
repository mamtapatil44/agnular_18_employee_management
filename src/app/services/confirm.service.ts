import { Injectable, Signal, signal } from '@angular/core';
interface ConfirmOptions {
  message: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private confirmSignal = signal<ConfirmOptions | null>(null);

  private confirmResultSignal = signal<boolean | null>(null);

  confirm(message: string, title: string = 'Confirm Action'): Promise<boolean> {
    this.confirmSignal.set({ message, title });

    return new Promise<boolean>((resolve) => {
      const interval = setInterval(() => {
        const response = this.confirmResultSignal();
        
        if (response !== null) {
          clearInterval(interval);

          this.confirmSignal.set(null);
          resolve(response);
        }
      }, 50); 
    });
  }


  userResponse(response: boolean): void {
    this.confirmResultSignal.set(response);
  }


  getConfirmationSignal(): Signal<ConfirmOptions | null> {
    return this.confirmSignal;
  }
}
