import { Injectable } from '@angular/core';
import { EmployeeFormatted } from '../../../models/response/employee';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class OvertimeCalculationService {
  constructor(private dashboardService: DashboardService) {}

  calculateOvertime(employees: EmployeeFormatted[]): EmployeeFormatted[] {
    let totalEmployeesClockTime = 0;
    let totalEmployeesRegularPay = 0;
    let totalEmployeesOverTimePay = 0;
    employees.forEach((employee) => {
      employee.totalClockedInTime = 0;
      employee.totalOvertimeHours = 0;

      const dailyOvertime = new Map<string, number>();

      employee.shifts.forEach((shift) => {
        const shiftDate = new Date(shift.clockIn).toISOString().split('T')[0];
        const shiftHours = (shift.clockOut - shift.clockIn) / 1000 / 60 / 60;
        employee.totalClockedInTime += shiftHours;

        // Update daily overtime
        const currentHours = dailyOvertime.get(shiftDate) || 0;
        dailyOvertime.set(shiftDate, currentHours + shiftHours);
      });

      // Calculate total overtime
      for (const [date, hours] of dailyOvertime) {
        if (hours > 8) {
          employee.totalOvertimeHours += hours - 8;
        }
      }
      employee.totalRegularHours =
        employee.totalClockedInTime - employee.totalOvertimeHours;
      employee.totalPaidRegularHours =
        employee.totalRegularHours * employee.hourlyRate;
      employee.totalOvertimePaidHours =
        employee.totalOvertimeHours * employee.hourlyRateOvertime;

      totalEmployeesClockTime += employee.totalClockedInTime;
      totalEmployeesRegularPay += employee.totalPaidRegularHours;
      totalEmployeesOverTimePay += employee.totalOvertimePaidHours;
    });
    this.dashboardService.updateTotalClockedTime(totalEmployeesClockTime);
    this.dashboardService.updateTotalRegularPay(totalEmployeesRegularPay);
    this.dashboardService.updateTotalOvertimePay(totalEmployeesOverTimePay);
    return employees;
  }
}
