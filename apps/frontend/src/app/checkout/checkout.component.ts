import { Component } from '@angular/core';

import { CheckoutService } from './checkout.service';

@Component({
  selector: 'stripe-playground-checkout',
  template: `
      <div style="display: flex; justify-content: center; align-items: center;">
          <button mat-button mat-raised-button
                  (click)="handleClick()">Go to checkout
          </button>
      </div>`
})
export class CheckoutComponent {
  constructor(private checkoutService: CheckoutService) {
  }

  handleClick() {
    this.checkoutService.goToCheckout()
      .subscribe();
  }
}
