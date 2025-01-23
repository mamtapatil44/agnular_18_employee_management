import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientProject } from '../../model/class/client-project';
import { ClientService } from '../../services/client.service';
import { IEmployee } from '../../model/interface/role';
import { Client } from '../../model/class/client';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderService } from '../../services/loader.service';
import { ToasterService } from '../../services/toaster.service';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-client-projects',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxPaginationModule],
  templateUrl: './client-projects.component.html',
  styleUrl: './client-projects.component.css'
})
export class ClientProjectsComponent implements OnInit {
  clientProjectObj :ClientProject = new ClientProject()
  clientProjectsList : ClientProject[] =[];
  clientService = inject(ClientService);
  loaderService = inject(LoaderService);
  toasterService = inject(ToasterService);
  confirmService = inject(ConfirmService);
  clientList: Client[] = [];
  employeeList : IEmployee[] =[];
  currentPage:number=1;

  projectForm :FormGroup = new FormGroup({
    clientProjectId : new FormControl(0),
    projectName : new FormControl(""),
    startDate : new FormControl(""),
    expectedendDate : new FormControl(""),
    leadByEmpId : new FormControl(""),
    completedDate : new FormControl(""),
    contactPerson : new FormControl(""),
    contactPersonContactNo : new FormControl(""),
    totalEmpWorking : new FormControl(""),
    projectCost : new FormControl(""),
    projectDetails : new FormControl(""),
    contactPersonEmailId : new FormControl(""),
    clientId : new FormControl(""),
  })

 ngOnInit(): void {
  this.getAllEmployee();
  this.getAllClients();
  this.getAllClientProjects()
   
 }

 getAllEmployee(){
  this.clientService.getAllEmployee().subscribe((res)=>{
    if(res.result){
      this.employeeList = res.data;
    }
    
  })
 }
 getAllClients(){
  this.clientService.getAllClients().subscribe((res)=>{
    if(res.result){
      this.clientList = res.data;
    }
    
  })
 }
 onProjectSave(){
  this.clientService.addUpdateClientProject(this.projectForm.value).subscribe((res)=>{
    if(res.result){
      this.toasterService.showToast('Project added successfully!', 'success');
     this.getAllClientProjects();
     this.projectForm.reset();
    }
  })
 }
 getAllClientProjects(){
  this.loaderService.showLoader();
  this.clientService.getAllClientProjects().subscribe((res)=>{
    if(res.result){
      this.clientProjectsList = res.data;
      this.loaderService.hideLoader();

    }
  },(err)=>{
    this.loaderService.hideLoader();
  })
 }


 async onDelete(id:any){
  const isDelete =  await this.confirmService.confirm("Are you sure you want to delete this project?")
  if(isDelete){
    this.clientService.deleteClientProject(id).subscribe((res)=>{
      if(res.result){
      this.toasterService.showToast('Project deleted successfully!', 'success');
      this.getAllClientProjects();
      }
    },(err)=>{
      this.toasterService.showToast('Failed to delete project. Please try again.', 'error');
    })
  }
 }

 onCancle(){
  this.projectForm.reset();
 }
}
