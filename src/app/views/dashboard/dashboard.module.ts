import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ShiftsTableComponent } from './components/shifts-table/shifts-table.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeDetailsTableComponent } from './components/employee-details-table/employee-details-table.component';
import { EmployeeEditPopupComponent } from './components/employee-edit-popup/employee-edit-popup.component';
import { ShiftsService } from './services/shift.service';
import { EmployeeService } from './services/employee.service';
import { ShiftProcessingService } from './services/shift-processing.service';
import { OvertimeCalculationService } from './services/overtime-calculation.service';

@NgModule({
  declarations: [
    DashboardComponent,
    ShiftsTableComponent,
    EmployeeComponent,
    EmployeeDetailsTableComponent,
    EmployeeEditPopupComponent,
  ],
  imports: [CommonModule, SharedModule, RouterOutlet, DashboardRoutingModule],
  providers: [
    ShiftsService,
    EmployeeService,
    ShiftProcessingService,
    OvertimeCalculationService,
  ],
})
export class DashboardModule {}
