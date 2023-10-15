import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudwithmatdialg';

  // inject a dependecy 
  constructor ( private _dialog:MatDialog){}
  
  // caret a method to open a dialog 
  openAndEditEmpform(){
    this._dialog.open(EmpAddEditComponent);
  }
}
