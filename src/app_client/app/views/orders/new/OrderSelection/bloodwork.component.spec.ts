import { BloodworkComponent } from './bloodwork.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from '../../../../services/db.service';
import { OrderService } from '../../../../services/order.service';
import { mock } from '../../../../utils/mock';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BloodworkOrder } from '../../../../models/pending-order.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BloodworkComponent', () => {

    let fixture: ComponentFixture<BloodworkComponent>;
    let bloodworkComponent;
    let orderService: OrderService;
    beforeEach(() => {
        const fb = mock(FormBuilder.prototype, 'FormBuilder');
        const orderBuilderService = mock(OrderBuilderService.prototype, 'OrderBuilderService');
        const router = mock(Router.prototype, 'Router');
        const db = mock(DBService.prototype, 'DBService');

        db.getBloodworkOptions.and.returnValue([new BloodworkOrder([], [], '', '', '', '', '', '')]);

        orderService = mock(OrderService.prototype, 'OrderService');
        TestBed.configureTestingModule({
            declarations: [
                BloodworkComponent
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
        fixture = TestBed.createComponent(BloodworkComponent);
        bloodworkComponent = fixture.componentInstance;
    })
    it('should submit on submit', () => {
        const date = new Date();
        spyOn(bloodworkComponent.form, 'get').and.returnValues(
            { value: [true] },
            { value: 'someNotes' },
            { value: 'someReason' },
        )
        bloodworkComponent.tests = [{ value: 'pfb', text: 'pfb' }];
        bloodworkComponent.order = new BloodworkOrder(
            [],
            [],
            '',
            '',
            '',
            `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`,
            '',
            ''
        )
        bloodworkComponent.onSubmit();
        expect(orderService.addOrder).toHaveBeenCalledWith(
            new BloodworkOrder(
                [{ value: 'pfb', text: 'pfb' }],
                [],
                'someReason',
                '',
                'someNotes',
                `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                '',
                ''))
    }
    );

    it('should select tab', () => {
        bloodworkComponent.staticTabs = {tabs: [{active: false}]};
        bloodworkComponent.selectTab(0);
        expect(bloodworkComponent.staticTabs.tabs[0].active).toBeTruthy();
    });

    it('should save', () => {
        const newOrder = new BloodworkOrder([], [], '', '', '', '', '', '');
        bloodworkComponent.order = newOrder;
        bloodworkComponent.save();
        expect(bloodworkComponent.orderService.addOrder).toHaveBeenCalledWith(newOrder);
    });

    it('should reset form', () => {
        this.form = spyOn(bloodworkComponent.form, 'reset');
        bloodworkComponent.resetForm();
        expect(bloodworkComponent.form.reset).toHaveBeenCalled();
    });
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    })
})
