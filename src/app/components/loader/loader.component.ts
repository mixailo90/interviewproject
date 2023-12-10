import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public loading = false;
  constructor(public loaderService: LoaderService) {
    this.loaderService.loading$.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    });
  }
}
