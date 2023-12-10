import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeFormatted } from '../../../models/response/employee';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private employees: BehaviorSubject<EmployeeFormatted[]> = new BehaviorSubject<
    EmployeeFormatted[]
  >([]);
  public employees$ = this.employees.asObservable();

  private totalClockedTime: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public totalClockedTime$ = this.totalClockedTime.asObservable();

  private totalRegularPay: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public totalRegularPay$ = this.totalRegularPay.asObservable();

  private totalOvertimePay: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public totalOvertimePay$ = this.totalOvertimePay.asObservable();

  constructor() {}

  updateEmployeeData(newData: EmployeeFormatted[]) {
    this.employees.next([...newData]);
  }
  updateTotalClockedTime(newData: number) {
    this.totalClockedTime.next(newData);
  }
  updateTotalRegularPay(newData: number) {
    this.totalRegularPay.next(newData);
  }
  updateTotalOvertimePay(newData: number) {
    this.totalOvertimePay.next(newData);
  }
}
