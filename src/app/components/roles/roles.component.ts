import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IRole, ResposeModel } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  roleList: IRole[] = [];
  masterService = inject(MasterService)

  ngOnInit(): void {
    console.log("in role component")
    this.getAllRoles();
  }

  getAllRoles() {
    this.masterService.getRoles().subscribe((res: ResposeModel) => {
      this.roleList = res.data
    }
    )

  }


}
