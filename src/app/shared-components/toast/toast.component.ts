import { Component, inject } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  private toastService = inject(ToasterService);
  toasts = this.toastService.toastsSignal;
  constructor(){
    console.log("toast component")
  }
}
