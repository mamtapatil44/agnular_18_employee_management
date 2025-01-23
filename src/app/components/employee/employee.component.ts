import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MasterService } from '../../services/master.service';
import { LoaderService } from '../../services/loader.service';
import { ToasterService } from '../../services/toaster.service';
import { ConfirmService } from '../../services/confirm.service';
import { IDesignation, IRole } from '../../model/interface/role';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeeList: any[] = [];
  currentPage: number = 1;
  masterService = inject(MasterService);
  loaderService = inject(LoaderService);
  toasterService = inject(ToasterService);
  confirmService = inject(ConfirmService);
  employeeForm: FormGroup = new FormGroup({
    roleId: new FormControl(0, Validators.required),
    empCode: new FormControl('', Validators.required),
    empId: new FormControl(0),
    empName: new FormControl('', Validators.required),
    empEmailId: new FormControl('', [Validators.required, Validators.email]),
    empDesignationId: new FormControl(0),
    empContactNo: new FormControl('', Validators.required),
    empAltContactNo: new FormControl(''),
    empPersonalEmailId: new FormControl('', [Validators.email]),
    empExpTotalYear: new FormControl(null,),
    empExpTotalMonth: new FormControl(null,),
    empCity: new FormControl('', Validators.required),
    empState: new FormControl('', Validators.required),
    empPinCode: new FormControl('', Validators.required),
    empAddress: new FormControl('', Validators.required),
    empPerCity: new FormControl('', Validators.required),
    empPerState: new FormControl('', Validators.required),
    empPerPinCode: new FormControl('', Validators.required),
    empPerAddress: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
    ErpEmployeeSkills: new FormArray([]),
    ErmEmpExperiences: new FormArray([])
  });
  roleList: IRole[] = [];
  designationList: IDesignation[] = [];

  get ErpEmployeeSkills() {
    return this.employeeForm.get('ErpEmployeeSkills') as FormArray;
  }

  get ErmEmpExperiences() {
    return this.employeeForm.get('ErmEmpExperiences') as FormArray;
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.getDesignationList();
    this.getRoleList();
  }
  addSkill() {
    const skillGroup = new FormGroup({
      empSkillId: new FormControl(null),
      empId: new FormControl(null),
      skill: new FormControl('', Validators.required),
      totalYearExp: new FormControl(0, Validators.min(0)),
      lastVersionUsed: new FormControl('')
    });

    this.ErpEmployeeSkills.push(skillGroup);
  }

  getRoleList() {
    this.masterService.getRoles().subscribe((data) => {
      this.roleList = data.data;
    });
  }

  getDesignationList() {
    this.masterService.getDesignations().subscribe((data) => {
      this.designationList = data.data;
    });
  }

  addExperience() {
    const experienceGroup = new FormGroup({
      empExpId: new FormControl(null),
      empId: new FormControl(null),
      companyName: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl(''),
      designation: new FormControl(''),
      projectsWorkedOn: new FormControl('')
    });

    this.ErmEmpExperiences.push(experienceGroup);
  }


  onSubmit() {
    let obj = this.employeeForm.value;
    obj.userName = this.employeeForm.value.empName;
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      this, this.masterService.addEmployee(obj).subscribe((res) => {
        if (res.result) {
          this.toasterService.showToast('Employee added successfully!', 'success');
          this.getEmployeeList();
          this.employeeForm.reset();
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.employeeForm.reset();
  }
  getEmployeeList() {
    this.loaderService.showLoader();
    this.masterService.getAllEmployee().subscribe((res => {
      console.log("res==== ", res)
      this.employeeList = res.data;
      this.loaderService.hideLoader();
    }))
    this.loaderService.hideLoader();
  }

  onDelete(empId: number) {
    this.masterService.deleteEmployee(empId).subscribe(response => {
      this.getEmployeeList();
    });
  }
 
}
