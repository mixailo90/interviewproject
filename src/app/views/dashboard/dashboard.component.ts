import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { forkJoin, takeUntil } from 'rxjs';
import { BaseComponent } from '../../shared/components/base.component';
import { ShiftsService } from './services/shift.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeFormatted } from '../../models/response/employee';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditPopupComponent } from './components/employee-edit-popup/employee-edit-popup.component';
import { Shift } from '../../models/response/shift';
import { LoaderService } from '../../services/loader.service';
import { DashboardService } from './services/dashboard.service';
import { ShiftProcessingService } from './services/shift-processing.service';
import { OvertimeCalculationService } from './services/overtime-calculation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends BaseComponent implements OnInit {
  totalEmployees: number = 0;
  employees: Array<EmployeeFormatted> = [];
  shifts: Array<Shift> = [];
  selectedRows: string[] = [];
  dataForDetails: EmployeeFormatted[] = [];
  constructor(
    private employeeService: EmployeeService,
    private shiftService: ShiftsService,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public dashboardService: DashboardService,
    private shiftProcessingService: ShiftProcessingService,
    private overtimeCalculationService: OvertimeCalculationService
  ) {
    super();
  }

  ngOnInit() {
    this.getEmployees();
  }
  private getEmployees(): void {
    this.loaderService.showLoader();
    this.employeeService
      .getList()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe({
        next: (result) => {
          this.employees = result.map(
            (employee) => new EmployeeFormatted(employee, [])
          );
          this.totalEmployees = result.length;
          this.getShiftsForAllEmployees();
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
  private getShiftsForAllEmployees(): void {
    this.shiftService
      .getList()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe((data: Shift[]) => {
        const processedData = this.shiftProcessingService.processShifts(
          data,
          this.employees
        );
        const updatedEmployees =
          this.overtimeCalculationService.calculateOvertime(
            processedData.employees
          );
        this.employees = updatedEmployees.map((employee) => ({ ...employee }));
        this.dashboardService.updateEmployeeData(this.employees);
      });
    this.loaderService.hideLoader(2);
  }

  onSelectionChange(selectedRows: string[]) {
    this.selectedRows = selectedRows;
  }

  onBulkEdit() {
    this.selectedRows.forEach((item) => {
      const exportElement = this.employees.find(
        (employee) => employee.id === item
      );
      if (exportElement) {
        this.dataForDetails.push(exportElement);
      }
    });
    const dialogRef = this.dialog.open(EmployeeEditPopupComponent, {
      width: '850px',
      data: this.dataForDetails,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe((result: any) => {
        this.selectedRows = [];
        this.dataForDetails = [];

        const allUpdateRequests: any[] = [];
        if (result?.employees) {
          result.employees.forEach((emp: EmployeeFormatted) => {
            const employeeUpdate = this.employeeService.update(emp.id, {
              name: emp.name,
              hourlyRateOvertime: emp.hourlyRateOvertime,
              hourlyRate: emp.hourlyRate,
            });
            allUpdateRequests.push(employeeUpdate);
          });
        }
        if (result?.shifts) {
          result.shifts.forEach((shift: Shift) => {
            const shiftUpdate = this.shiftService.update(shift.id, {
              clockIn: shift.clockIn,
              clockOut: shift.clockOut,
            });
            allUpdateRequests.push(shiftUpdate);
          });
        }
        forkJoin(allUpdateRequests)
          .pipe(takeUntil(this.ngSubscriptions))
          .subscribe({
            next: () => {
              this.getEmployees();
            },
            error: (error) => {
              console.error('Error in updating', error);
            },
          });
      });
  }
}
