import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'entered-component',
    templateUrl: 'entered.component.html'
})
export class EnteredOrderComponent implements OnInit {
    private type: string;
    private sub: Subscription;
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.type = params["order"];
        });
    }

}