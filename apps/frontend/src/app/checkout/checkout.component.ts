import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'stripe-playground-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  sessionId$: Observable<string> = this.checkoutService.getSession();

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
  }

  async handleClick(sessionId: string) {
    await this.checkoutService.goToCheckout(sessionId)
  }
}
