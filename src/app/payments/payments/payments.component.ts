import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Payment } from '../model/payment';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments$: Observable<Payment[]>;
  displayedColumns = ['id', 'name', 'formaPg', 'statusPg', 'datePgAgends'];

  //paymentService: PaymentsService;

  constructor(
    private paymentService: PaymentsService,
    public dialog: MatDialog
    ) {

    //this.paymentService = new PaymentsService();

    this.payments$ = this.paymentService.list().pipe(
      catchError(Error => {
        this.onError('Erro ao carregar Pagamentos!')
        return of([])
      })
    )

   }

   onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
   }

  ngOnInit(): void {
  }

}
