import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSignal = signal<boolean>(false);

  get loader$() {
    return this.loaderSignal;
  }


  showLoader(): void {
    this.loaderSignal.set(true); 
  }

  hideLoader(): void {
    this.loaderSignal.set(false); 
  }
}
