import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResposeModel } from '../model/interface/role';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http :HttpClient) { }

  // Designations
  getDesignations():Observable<ResposeModel>{
    return this.http.get<ResposeModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllDesignation")
  }
  addBulkDesignations(obj:any):Observable<ResposeModel>{
    return this.http.post<ResposeModel>(environment.API_URL +"https://freeapi.miniprojectideas.com/api/ClientStrive/AddUpdateBulkDesignation",obj)
  }
  updateDesignations(obj:any):Observable<ResposeModel>{
    return this.http.put<ResposeModel>(environment.API_URL +"UpdateEmployee",obj)
  }
  deleteDesignation(id:number):Observable<ResposeModel>{
    return this.http.delete<ResposeModel>(environment.API_URL +"DeleteDesignationById?designationId="+id)
  }

  // role:
  getRoles():Observable<ResposeModel>{
    return this.http.get<ResposeModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles")
  }
  addBulkRole(obj:any):Observable<ResposeModel>{
    return this.http.post<ResposeModel>(environment.API_URL +"https://freeapi.miniprojectideas.com/api/ClientStrive/AddUpdateBulkRoles",obj)
  }
  deleteRole(id:number):Observable<ResposeModel>{
    return this.http.delete<ResposeModel>(environment.API_URL +"DeleteRoleById'?roleid="+id)
  }
 



// employee
    getAllEmployee():Observable<ResposeModel>{
      return this.http.get<ResposeModel>(environment.API_URL +"GetAllEmployee")
    }
    getEmployee(id:number):Observable<ResposeModel>{
      return this.http.get<ResposeModel>(environment.API_URL +"https://freeapi.miniprojectideas.com/api/ClientStrive/GetEmployeeByEmployeeId?id=" +id)
    }
    addEmployee(obj:any):Observable<ResposeModel>{
      return this.http.post<ResposeModel>(environment.API_URL +"https://freeapi.miniprojectideas.com/api/ClientStrive/CreateNewEmployee",obj)
    }
    updateEmployee(obj:any):Observable<ResposeModel>{
      return this.http.put<ResposeModel>(environment.API_URL +"UpdateEmployee",obj)
    }
    deleteEmployee(id:number):Observable<ResposeModel>{
      return this.http.delete<ResposeModel>(environment.API_URL +"DeleteEmployeeByEmpId?empId="+id)
    }
}
