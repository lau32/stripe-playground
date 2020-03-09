import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private http: HttpClient) {
  }

  getSession(): Observable<string> {
    return this.http.get<{ id: string }>('http://localhost:3333/api/session')
      .pipe(map(res => res.id));
  }

  async goToCheckout(sessionId: string) {
    const stripe = await loadStripe('pk_test_UIQin0r8dHqgrdkOUeF9enQl00BIqwsTtC');

    await stripe.redirectToCheckout({ sessionId })
  }
}
