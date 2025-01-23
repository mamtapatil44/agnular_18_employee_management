import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { LoaderService } from '../../services/loader.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToasterService } from '../../services/toaster.service';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule,NgxPaginationModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService)
  loaderService = inject(LoaderService)
  toasterService = inject(ToasterService);
  confirmService = inject(ConfirmService);
  currentPage :number =1;

  ngOnInit(): void {
    this.getAllCliensts();

  }

  getAllCliensts() {
    this.loaderService.showLoader();
    this.clientService.getAllClients().subscribe((res) => {
      if (res.data) {
        this.clientList = res.data;
        this.loaderService.hideLoader();
      }
    }, (err) => {
      this.loaderService.hideLoader();
    })
  }
  onClientSave() {
    this.clientService.addUpdateClients(this.clientObj).subscribe((res) => {
      console.log("res", res);
      if (res.result) {
        this.toasterService.showToast('Client updated successfully!', 'success');
        this.getAllCliensts();
        this.clientObj = new Client();
      }

    })

  }
  async deleteClient(clientId: number) {
    const isDelete =  await this.confirmService.confirm("Are you sure you want to delete this client?")
    if (isDelete) {
      this.clientService.deleteClient(clientId).subscribe((res) => {
        if (res.result) {
          this.toasterService.showToast('Client deleted successfully!', 'success');
          this.getAllCliensts();
        }
      })
    }
  }
  editClient(data:Client){
    this.clientObj = data;

  }
}
