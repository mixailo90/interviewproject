import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class BaseComponent implements OnDestroy {
  protected ngSubscriptions: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.ngSubscriptions.complete();
  }
}
