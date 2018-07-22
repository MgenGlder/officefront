import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'view-specific-order.component.html'
})
export class ViewSpecificOrderComponent implements OnInit, OnDestroy {
    id: number;
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
    constructor(public route: ActivatedRoute, private http: HttpClient) {
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.sub = this.http.get('./assets/singlePatientData.json')
                .subscribe((data) => {
                    this.data = data[0];
                })
        })
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
