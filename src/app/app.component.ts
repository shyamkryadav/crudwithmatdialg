import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './serives/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor ( private _dialog:MatDialog,private _empServie:EmployeeService,private _coreServices:CoreService){}
  ngOnInit(): void {
      this.getEmployeList()

  }
  
  // caret a method to open a dialog 
  openAndEditEmpform(){
   const dialogRef= this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeList();
      }
    }
   })
  }

  // fetch the all data show on table 
  getEmployeList(){
    this._empServie.getEmployeeList().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.sort=this.sort
        this.dataSource.paginator=this.paginator
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // delete function 
  deleteEmployee(id:number){
    this._empServie.deleteEmployee(id).subscribe({
      next:(res)=>{
      this._coreServices.openSnackBar('Employee Deleted!','Done',)
        this.getEmployeList()
      },
      error:console.log,
    })
  }

  openEditForm(data:any){
  const dialogRef=  this._dialog.open(EmpAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeList();
        }
      }
     })
   }

}
