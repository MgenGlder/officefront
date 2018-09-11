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
        '.steps .attached .message .icon { color: rgba(0,140,0); }',
        '.ui.icon.message { height: 70px; }'
    ]
})
export class ViewSpecificOrderComponent implements OnInit, OnDestroy {
    id: string;
    public data: any;
    public specificPatient: any;
    public allCompleted: boolean;
    public paramSubscription;

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
        this.paramSubscription = await this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        await this.orderService.getOrder(this.id).toPromise().then(order => {
            this.data = order;
        });

        this.allCompleted = true;
        for (const status in this.data.message.statuses) {
            if (this.data.message.statuses[status].timeCompleted == null) {
                this.allCompleted = false;
                break;
            }
        }
    }

    ngOnDestroy() {
        this.paramSubscription.unsubscribe();
    }
}
