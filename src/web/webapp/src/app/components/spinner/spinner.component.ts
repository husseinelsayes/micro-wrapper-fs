import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { LoaderState } from '../../model/LoaderState';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  show = false;
  
  private subscription: Subscription;
  
  constructor(private loaderService: LoaderService) { }
  
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
