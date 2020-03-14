import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const SESSION_URL = 'http://localhost:3333/api/session';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  stripe$: Observable<Stripe> = from(loadStripe(environment.STRIPE_PK));

  constructor(private http: HttpClient) {
  }

  getSession(): Observable<string> {
    return this.http.get<{ id: string }>(SESSION_URL)
      .pipe(map(res => res.id));
  }

  redirectToCheckout(sessionId: string)
    : Observable<never | { error: StripeError }> {
    return this.stripe$.pipe(
      mergeMap((stripe: Stripe) =>
        stripe.redirectToCheckout({ sessionId })
      )
    );
  }

  goToCheckout() {
    return this.getSession().pipe(
      mergeMap((sessionId: string) =>
        this.redirectToCheckout(sessionId))
    );
  }
}
