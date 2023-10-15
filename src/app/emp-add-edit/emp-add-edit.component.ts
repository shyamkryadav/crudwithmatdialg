import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../serives/employee.service';
import { Subscriber, subscribeOn } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParseTreeResult } from '@angular/compiler';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
empForm:FormGroup;

  education:string[]=['Diploma','Graduate','Materic','Post Graduate']

  constructor(private _fb:FormBuilder, private _empService:EmployeeService,private _dialgRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private _coreServices:CoreService
    ){
    this.empForm=this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val:any)=>{
          this._coreServices.openSnackBar('Employee Update Successfully','Done',)

            this._dialgRef.close(true);
          },
          error:(err:any)=>{
            console.log(err)
          }
        })

      }
      else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val:any)=>{
            alert("Employee added Successfully")
            this._dialgRef.close(true);
          },
          error:(err:any)=>{
            console.log(err)
          }
        })
      }
    }
  }
}
