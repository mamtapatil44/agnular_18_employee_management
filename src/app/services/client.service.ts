import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResposeModel } from '../model/interface/role';
import { Client } from '../model/class/client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAllClients():Observable<ResposeModel>{
    return this.http.get<ResposeModel>(environment.API_URL +"GetAllClients")
  }
  addUpdateClients(obj:Client):Observable<ResposeModel>{
    return this.http.post<ResposeModel>(environment.API_URL +"AddUpdateClient",obj)
  }
  deleteClient(id:number):Observable<ResposeModel>{
    return this.http.delete<ResposeModel>(environment.API_URL +"DeleteClientByClientId?clientId="+id)
  }

  getAllEmployee():Observable<ResposeModel>{
    return this.http.get<ResposeModel>(environment.API_URL +"GetAllEmployee")
  }

  getAllClientProjects():Observable<ResposeModel>{
    return this.http.get<ResposeModel>(environment.API_URL +"GetAllClientProjects")
  }
  addUpdateClientProject(obj:Client):Observable<ResposeModel>{
    return this.http.post<ResposeModel>(environment.API_URL +"AddUpdateClientProject",obj)
  }
  deleteClientProject(id:number):Observable<ResposeModel>{
    return this.http.delete<ResposeModel>(environment.API_URL +"DeleteProjectByProjectId?projectId="+id)
  }
}
