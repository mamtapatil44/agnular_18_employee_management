export class ClientProject {
    clientProjectId: number;
    projectName: string;
    startDate: string;
    expectedEndDate: string;
    leadByEmpId: string;
    empName?:string;
    completedDate: string;
    contactPerson: string;
    contactPersonContactNo: string;
    totalEmpWorking: string;
    projectCost: string;
    projectDetails: string;
    contactPersonEmailId: string;
    clientId: string;
  
    constructor() {
      this.clientProjectId = 0;
      this.projectName = '';
      this.startDate = '';
      this.expectedEndDate = '';
      this.leadByEmpId = '';
      this.completedDate = '';
      this.contactPerson = '';
      this.contactPersonContactNo = '';
      this.totalEmpWorking = '';
      this.projectCost = '';
      this.projectDetails = '';
      this.contactPersonEmailId = '';
      this.clientId = '';
    }
  }
  