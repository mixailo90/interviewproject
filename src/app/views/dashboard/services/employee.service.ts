import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployeeRequest } from '../../../models/request/employee';
import { Employee } from '../../../models/response/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.API_BASE_URL}/employees`);
  }

  update(
    employeeId: string,
    employeeData: Partial<EmployeeRequest>
  ): Observable<EmployeeRequest> {
    return this.http
      .patch<EmployeeRequest>(
        `${environment.API_BASE_URL}/employees/${employeeId}`,
        employeeData
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating employee:', error);
          return throwError(error);
        })
      );
  }
}
