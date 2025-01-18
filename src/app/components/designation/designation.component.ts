import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { IDesignation, ResposeModel } from '../../model/interface/role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {
  masterService = inject(MasterService);
  designationList :IDesignation[] =[];
  ngOnInit(): void {
    this.getDesignation();
    
  }

  getDesignation(){
    this.masterService.getDesignations().subscribe((res:ResposeModel)=>{
      this.designationList = res.data;
    },
    (error) => {
    }
    )
    
  }

}
