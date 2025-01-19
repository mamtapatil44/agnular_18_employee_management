import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IRole, ResposeModel } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { ConfirmService } from '../../services/confirm.service';
import { LoaderService } from '../../services/loader.service';
import { ToasterService } from '../../services/toaster.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxPaginationModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
 roleList :IRole[] =[];
 masterService = inject(MasterService)
 confirmService = inject(ConfirmService)
 loaderService = inject(LoaderService)
 toasterService = inject(ToasterService)
 roleInput: string = ''; 
 currentPage :number =1
  roles: any;
  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
    this.loaderService.showLoader()
    this.masterService.getRoles().subscribe((res:ResposeModel)=>{
         this.roleList = res.data;
         this.loaderService.hideLoader()
       },(err)=>{
        this.loaderService.hideLoader()
       }
       )
     
  }

  addRoles(roleI:any){
    let roles ;
    roles = roleI.roleNames
    .split(',')
    .map((role:any) => role.trim()) 
    .map((role :any) => ({
      roleId: 0,  
      role: role      
    }));
    console.log("roles" ,roles)
    this.masterService.addBulkRole(roles).subscribe((res)=>{
      if(res.result){
        this.getAllRoles();
        this.roleInput =''
        this.toasterService.showToast("Roles added successfully!","success")
      }
    })

  }

  async onDeleteRole(id:number){
    const isDelete = await this.confirmService.confirm("Are you sure you want to delete this role?")
    if(isDelete){
      this.masterService.deleteRole(id).subscribe((res)=>{
        if(res.result){
          this.getAllRoles();
          this.toasterService.showToast("Role deleted successfully!","success")
        }
      })

    }
  }
  

}
