import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService)

  ngOnInit(): void {
    this.getAllCliensts();

  }

  getAllCliensts() {
    this.clientService.getAllClients().subscribe((res) => {
      if (res.data) {
        this.clientList = res.data
      }
    }, (err) => {

    })
  }
  onClientSave() {
    this.clientService.addUpdateClients(this.clientObj).subscribe((res) => {
      console.log("res", res);
      if (res.result) {
        alert("Client added successfully.....")
        this.getAllCliensts();
        this.clientObj = new Client();
      }

    })

  }
  deleteClient(clientId: number) {
    const isDelete = confirm("Are you want to delete");
    if (isDelete) {
      this.clientService.deleteClient(clientId).subscribe((res) => {
        if (res.result) {
          alert("Client deleted Successfully....")
        }
      })
    }
  }
  editClient(data:Client){
    this.clientObj = data;

  }
}
