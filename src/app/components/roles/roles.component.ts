import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
 roleList :IRole[] =[];
 http = inject(HttpClient)

  ngOnInit(): void {
    console.log("in role component")
    this.getAllRoles();
  }

  getAllRoles(){
    this.http.get("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res:any)=>{
      this.roleList = res.data;
    })
     
  }
  

}
