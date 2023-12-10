import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Shift } from '../../../models/response/shift';
import { ShiftRequest } from '../../../models/request/shift';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  constructor(private http: HttpClient) {}

  getList(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${environment.API_BASE_URL}/shifts`);
  }
  update(
    shiftId: string,
    shiftData: Partial<ShiftRequest>
  ): Observable<ShiftRequest> {
    return this.http
      .patch<Shift>(`${environment.API_BASE_URL}/shifts/${shiftId}`, shiftData)
      .pipe(
        catchError((error) => {
          console.error('Error updating shift:', error);
          return throwError(error);
        })
      );
  }
}
