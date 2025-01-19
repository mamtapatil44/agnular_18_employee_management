import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { IDesignation, ResposeModel } from '../../model/interface/role';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '../../services/toaster.service';
import { ConfirmService } from '../../services/confirm.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxPaginationModule],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {
  masterService = inject(MasterService);
  toasterService = inject(ToasterService);
  confirmService = inject(ConfirmService);
   loaderService = inject(LoaderService)
  designationList :IDesignation[] =[];
  newDesignationInput = ''
  currentPage :number =1;
  ngOnInit(): void {
    this.getDesignation();
    
  }

  getDesignation(){
    this.loaderService.showLoader();
    this.masterService.getDesignations().subscribe((res:ResposeModel)=>{
      this.designationList = res.data;
      this.loaderService.hideLoader();
    },
    (error) => {
      this.loaderService.hideLoader();
    }
    )
    
  }
  addDesignations(designationI:any){
    let designations;
    console.log("designationI ",designationI)
    designations = designationI.designationNames
    .split(',')
    .map((item:any) => item.trim()) 
    .map((item :any) => ({
      designationId: 0,  
      designation: item      
    }));
    console.log("designations" ,designations)
    this.masterService.addBulkDesignations(designations).subscribe((res)=>{
      if(res.result){
        this.getDesignation();
        this.newDesignationInput =''
        this.toasterService.showToast("Designations added successfully!","success")
      }
    })
  }
  async deleteDesignation(id:number){
    const isDelete = await this.confirmService.confirm("Are you sure you want to delete this designation?")
    if(isDelete){
      this.masterService.deleteDesignation(id).subscribe((res)=>{
        if(res.result){
          this.getDesignation();
          this.toasterService.showToast("Designation deleted successfully!","success")
        }
      })
  }}
}
