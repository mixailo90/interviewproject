import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delayWhen,
  distinctUntilChanged,
  map,
  Observable,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject(1);
  public loading$: Observable<boolean> = this.loading.asObservable().pipe(
    map((value) => !!value),
    distinctUntilChanged(),
    delayWhen((value) => (!value ? timer(1000) : timer(0)))
  );

  public hideLoader(counter?: number): void {
    const value =
      this.loading.getValue() - (counter && counter > 0 ? counter : 1);
    this.loading.next(value < 0 ? 0 : value);
  }

  public showLoader(counter?: number): void {
    this.loading.next(
      this.loading.getValue() + (counter && counter > 0 ? counter : 1)
    );
  }
}
