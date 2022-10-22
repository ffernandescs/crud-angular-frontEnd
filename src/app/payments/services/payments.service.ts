import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, first, delay } from 'rxjs/operators';

import { Payment } from '../model/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private readonly API = '/assets/spayments.json'


  constructor(private httpClient: HttpClient) { }

  list() {
      return this.httpClient.get<Payment[]>(this.API).pipe(
        first(),
        delay(1000),
        tap(payments => console.log(payments))
      );
  }
}

