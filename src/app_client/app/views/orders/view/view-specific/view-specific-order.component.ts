import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { OrderService } from './../../../../services/order.service';

@Component({
    templateUrl: 'view-specific-order.component.html',
    styles: ['.steps .disabled .icon { color: rgba(190,0,0,.3);  }',
             '.steps .finished .icon { color: rgba(0,140,0); }',
             '.steps .inprogress .icon { color: rgb(255,165,0); }',
             '.steps .attached .message .icon { color: rgba(0,140,0); }']
})
export class ViewSpecificOrderComponent implements OnInit, OnDestroy {
    id: string;
    public sub: any;
    public data: any;
    public specificPatient: any;

    public mappingsForOrders: {} = {
        'XRay': 'X-Ray',
        'RNToMonitorBp': 'RN for BP',
        'RNToMonitorBs': 'RN for BS',
        'bloodwork': 'Bloodwork'
    };
    public mappingsForStatuses: {} = {
        'ordered': 'Ordered',
        'faxed': 'Faxed',
        'completed': 'Completed',
        'awaitingSignature': 'Awaiting Signature',
    }
    constructor(public route: ActivatedRoute, private http: HttpClient, private orderService: OrderService) {
    }
    async ngOnInit() {
        // Observable.forkJoin()
        await this.route.params.subscribe(params => {
            this.id = params['id'];
            this.sub = this.http.get('./assets/singlePatientData.json')
                .subscribe((data) => {
                    this.data = data[0];
                })
        })
        this.orderService.getOrder(this.id).subscribe(order => {
            // TODO: use the data in here, or await the call. Either or.
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
