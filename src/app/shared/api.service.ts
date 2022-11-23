import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postEmploye(data :any){
    return this.http.post<any>("https://github.com/vikasyadu2603/AngularCrudOperation/blob/master/db.json", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmploye(){
    return this.http.get<any>("https://github.com/vikasyadu2603/AngularCrudOperation/blob/master/db.json")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmploye(id :number){
    return this.http.delete<any>("https://github.com/vikasyadu2603/AngularCrudOperation/blob/master/db.json/"+id)
    .pipe(map((res:any)=>{
      return res;
     
    }))
  }
  updateEmploye(data :any ,id: number){
    return this.http.put<any>("https://github.com/vikasyadu2603/AngularCrudOperation/blob/master/db.json/"+id , data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
