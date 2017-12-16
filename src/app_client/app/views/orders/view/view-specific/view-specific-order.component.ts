import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

declare var $: any;
@Component({
    templateUrl: 'view-specific-order.component.html'
})
export class ViewSpecificOrderComponent implements OnInit, OnDestroy {
    id: number;
    private sub: any;
    public data: any;
    public specificPatient: any;

    public mappingsForOrders: {} = {
        "XRay"         : "X-Ray",
        "RNToMonitorBp": "RN for BP",
        "RNToMonitorBs": "RN for BS",
        "bloodwork"    : "Bloodwork"
    };
    public mappingsForStatuses: {} = {
        "ordered"          : "Ordered",
        "faxed"            : "Faxed",
        "completed"        : "Completed",
        "awaitingSignature": "Awaiting Signature",
    }
    constructor(private route: ActivatedRoute, private http: Http) {
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.sub = this.http.get('./assets/singlePatientData.json')
                .subscribe((data) => {
                    setTimeout(() => {
                        this.data = data.json()[0];
                    }, 2000);
                })
        })
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
