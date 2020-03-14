import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: '**',
    redirectTo: 'checkout'
  }
];

@NgModule({
  declarations: [AppComponent, CheckoutComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,

    MatButtonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
