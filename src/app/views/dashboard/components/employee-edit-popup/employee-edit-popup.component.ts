import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeFormatted } from '../../../../models/response/employee';
import { Shift } from '../../../../models/response/shift';
import { BaseComponent } from '../../../../shared/components/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-edit-popup',
  templateUrl: './employee-edit-popup.component.html',
  styleUrl: './employee-edit-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditPopupComponent
  extends BaseComponent
  implements OnInit
{
  localData: EmployeeFormatted[];
  updatedEmployeeData: EmployeeFormatted[] = [];
  updatedShifts: Shift[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmployeeFormatted[],
    private dialogRef: MatDialogRef<EmployeeEditPopupComponent>
  ) {
    super();
  }
  ngOnInit() {
    this.localData = this.data;
    this.updatedEmployeeData = this.data;
    this.dialogRef
      .beforeClosed()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe(() => {
        this.clearData();
      });
  }
  clearData() {
    this.localData = [];
    this.updatedEmployeeData = [];
    this.updatedShifts = [];
  }
  changeEmployeeData(changedEmployee: EmployeeFormatted) {
    this.updatedEmployeeData = this.updatedEmployeeData.map((employee) =>
      employee.id === changedEmployee.id ? changedEmployee : employee
    );
  }
  changeShiftData(shifts: Shift[]) {
    this.updatedShifts = shifts;
  }
  saveChanges() {
    this.dialogRef.close({
      employees: this.updatedEmployeeData,
      shifts: this.updatedShifts,
    });
  }
}
