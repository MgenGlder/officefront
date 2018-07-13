import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    // tslint:disable-next-line
    selector: 'entered-component',
    templateUrl: 'entered.component.html'
})
export class EnteredOrderComponent implements OnInit {
    public type: string;
    constructor(private activatedRoute: ActivatedRoute) {}
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.type = params['order'];
        });
    }

}
