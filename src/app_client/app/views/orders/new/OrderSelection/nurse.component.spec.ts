import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NurseOrder } from '../../../../models/pending-order.model';
import { DBService } from '../../../../services/db.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { OrderService } from '../../../../services/order.service';
import { mock } from '../../../../utils/mock';
import { NurseComponent } from './nurse.component';
describe('NurseComponent', () => {

    let fixture: ComponentFixture<NurseComponent>;
    let nurseComponent;
    let orderService: OrderService;
    beforeEach(() => {
        const fb = mock(FormBuilder.prototype, 'FormBuilder');
        const orderBuilderService = mock(OrderBuilderService.prototype, 'OrderBuilderService');
        const router = mock(Router.prototype, 'Router');
        const db = mock(DBService.prototype, 'DBService');

        db.getNurseOptions.and.returnValue([new NurseOrder(
            [],
            '',
            '',
            '',
            '',
            ''
        )]);

        orderService = mock(OrderService.prototype, 'OrderService');
        TestBed.configureTestingModule({
            declarations: [
                NurseComponent
            ],
            providers: [
                FormBuilder,
                {
                    provide: OrderBuilderService, useValue: orderBuilderService
                },
                {
                    provide: Router, useValue: router
                },
                {
                    provide: DBService, useValue: db
                },
                {
                    provide: OrderService, useValue: orderService
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
        TestBed.compileComponents();
        fixture = TestBed.createComponent(NurseComponent);
        nurseComponent = fixture.componentInstance;
    })
    it('should submit on submit', () => {
        const date = new Date();
        spyOn(nurseComponent.form, 'get').and.returnValues(
            { value: [true] },
            { value: 'someNotes' },
            { value: 'someReason' },
        )
        nurseComponent.tests = [{ value: 'pfb', text: 'pfb' }];
        nurseComponent.order = new NurseOrder(
            [],
            '',
            '',
            `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            '',
            ''
        )
        nurseComponent.onSubmit();
        expect(orderService.addOrder).toHaveBeenCalledWith(
            new NurseOrder(
                [{ value: 'pfb', text: 'pfb' }],
                'someReason',
                'someNotes',
                `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                '',
                '')
        )
    }
    );

    it('should select tab', () => {
        nurseComponent.staticTabs = { tabs: [{ active: false }] };
        nurseComponent.selectTab(0);
        expect(nurseComponent.staticTabs.tabs[0].active).toBeTruthy();
    });

    it('should save', () => {
        const newOrder = new NurseOrder(
            [],
            '',
            '',
            '',
            '',
            ''
        );
        nurseComponent.order = newOrder;
        nurseComponent.save();
        expect(nurseComponent.orderService.addOrder).toHaveBeenCalledWith(newOrder);
    });

    it('should reset form', () => {
        this.form = spyOn(nurseComponent.form, 'reset');
        nurseComponent.resetForm();
        expect(nurseComponent.form.reset).toHaveBeenCalled();
    });
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    })
})
