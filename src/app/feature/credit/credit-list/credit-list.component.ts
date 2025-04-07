import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-credit-list',
  standalone: false,
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css'
})
export class CreditListComponent {
  title: string = 'Credit-List';
  credits!: Credit[];
  subscription!: Subscription;

  constructor(private creditSvc: CreditService) {}

  ngOnInit(): void {
    this.subscription = this.creditSvc.list().subscribe((resp) => {
      this.credits = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
