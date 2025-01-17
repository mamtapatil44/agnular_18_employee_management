import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResposeModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http :HttpClient) { }

  getDesignations():Observable<ResposeModel>{
    return this.http.get<ResposeModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllDesignation")
  }
  getRoles():Observable<ResposeModel>{
    return this.http.get<ResposeModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles")
  }
}
