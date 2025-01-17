import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientProject } from '../../model/class/client-project';
import { ClientService } from '../../services/client.service';
import { IEmployee } from '../../model/interface/role';
import { Client } from '../../model/class/client';

@Component({
  selector: 'app-client-projects',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './client-projects.component.html',
  styleUrl: './client-projects.component.css'
})
export class ClientProjectsComponent implements OnInit {
  clientProjectObj :ClientProject = new ClientProject()
  clientProjectsList : ClientProject[] =[];
  clientService = inject(ClientService);
  clientList: Client[] = [];
  employeeList : IEmployee[] =[];


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
     this.getAllClientProjects()
    }
  })
 }
 getAllClientProjects(){
  this.clientService.getAllClientProjects().subscribe((res)=>{
    if(res.result){
      this.clientProjectsList = res.data;
    }
  })
 }

 onEdit(data:ClientProject){
  this.clientProjectObj = data;
  this.projectForm.patchValue(this.clientProjectObj)

 }
 onDelete(id:any){
  const isDelete = confirm("Are you want to delete it?")
  if(isDelete){
    this.clientService.deleteClientProject(id).subscribe((res)=>{
      if(res.result){
      alert("Project deleted Successfully...");
      this.getAllClientProjects();
      }
    })
  }
  
 }
}
