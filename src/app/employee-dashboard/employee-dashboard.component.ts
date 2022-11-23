import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{
  formValue !: FormGroup;
  employeemodelObj : EmployeeModel =new EmployeeModel();
  employeeData !: any;
  showAdd ! :boolean;
  showUdate !: boolean;
  constructor(private formbuilber: FormBuilder ,
    private api : ApiService){}
  ngOnInit(): void {
    this.formValue=this.formbuilber.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      salary : [''],
    
    })
    this.getAllData();
  }
  clickAddemployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUdate=false;
  }
  postEmployeeDetails(){
    this.employeemodelObj.firstname =this.formValue.value.firstname;
    this.employeemodelObj.lastname =this.formValue.value.lastname;
    this.employeemodelObj.email =this.formValue.value.email;
    this.employeemodelObj.mobile =this.formValue.value.mobile;
    this.employeemodelObj.salary =this.formValue.value.salary;
// console.log(  this.employeemodelObj.salary =this.formValue.value.salary)
 this.api.postEmploye(this.employeemodelObj)
 .subscribe
 (res =>{
  console.log(res)
  alert("Data has been created")
  this.getAllData()
  let ref =document.getElementById("cancel")
  ref?.click();
  this.formValue.reset();
 },
 err=>{
  alert("not created")
  this.getAllData()
 })
}
getAllData(){
  this.api.getEmploye()
  .subscribe(res=>{
    this.employeeData =res;

  })
}
deleteData(row :any){
  
  this.api.deleteEmploye(row.id)
  .subscribe(res =>{
    alert("data has been deleted")
    this.getAllData()
  })
}

onEdit(row :any){
  this.showAdd=false;
  this.showUdate=true;
  this.employeemodelObj.id=row.id;
  this.formValue.controls['firstname'].setValue(row.firstname);
  this.formValue.controls['lastname'].setValue(row.lastname);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
  }

updateValue(){
  this.employeemodelObj.firstname =this.formValue.value.firstname;
  this.employeemodelObj.lastname =this.formValue.value.lastname;
  this.employeemodelObj.email =this.formValue.value.email;
  this.employeemodelObj.mobile =this.formValue.value.mobile;
  this.employeemodelObj.salary =this.formValue.value.salary;
  this.api.updateEmploye(this.employeemodelObj ,this.employeemodelObj.id)
  .subscribe(res=>{
    alert("Update Successfuly")
    let ref =document.getElementById("cancel")
    ref?.click();
    this.formValue.reset();
    this.getAllData()
  })
}

}
