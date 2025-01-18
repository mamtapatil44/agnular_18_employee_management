import { Component, inject, Input } from '@angular/core';
import { ConfirmService } from '../../services/confirm.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  private confirmationService = inject(ConfirmService);
  confirmationDialog = this.confirmationService.getConfirmationSignal();

  handleResponse(response: boolean): void {
    this.confirmationService.userResponse(response);  
  }
}
