import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TestOrder } from '../../../../models/pending-order.model';
import { DBService } from '../../../../services/db.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { OrderService } from '../../../../services/order.service';
import { mock } from '../../../../utils/mock';
import { TestComponent } from './test.component';
describe('TestComponent', () => {

    let fixture: ComponentFixture<TestComponent>;
    let testComponent;
    let orderService: OrderService;
    beforeEach(() => {
        const fb = mock(FormBuilder.prototype, 'FormBuilder');
        const orderBuilderService = mock(OrderBuilderService.prototype, 'OrderBuilderService');
        const router = mock(Router.prototype, 'Router');
        const db = mock(DBService.prototype, 'DBService');

        db.getTestOptions.and.returnValue([new TestOrder(
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        )]);

        orderService = mock(OrderService.prototype, 'OrderService');
        TestBed.configureTestingModule({
            declarations: [
                TestComponent
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
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
    })
    it('should submit on submit', () => {
        const date = new Date();
        spyOn(testComponent.form, 'get').and.returnValues(
            { value: 'someNotes' },
            { value: [true, false, true] },
            { value: 'someBloodReason' },
            { value: 'someBloodNotes' },
            { value: 'someEyeNotes' },
            { value: 'someEyeNotes' },
            { value: 'someSalivaNotes' },
            { value: 'someSalivaNotes' }
        );
        testComponent.orderService.visitingDoctor = 'Adler';
        testComponent.orderService.referrer = 'Kunle';
        testComponent.tests = [{ value: 'blood', text: 'blood' }, { value: 'eye', text: 'eye' }, { value: 'saliva', text: 'saliva' }];
        testComponent.order = new TestOrder(
            '',
            '',
            `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            '',
            '',
            '',
            ''
        )
        testComponent.onSubmit();
        expect(orderService.addOrder).toHaveBeenCalledWith(
            new TestOrder(
                'blood',
                'someBloodReason',
                '',
                'someBloodNotes',
                `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                'Adler',
                'Kunle'
            )
        )
    }
    );

    it('should select tab', () => {
        testComponent.staticTabs = { tabs: [{ active: false }] };
        testComponent.selectTab(0);
        expect(testComponent.staticTabs.tabs[0].active).toBeTruthy();
    });

    it('should save', () => {
        const newOrder = new TestOrder(
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        );
        testComponent.orders = [newOrder];
        testComponent.save();
        expect(testComponent.orderService.addOrder).toHaveBeenCalledWith(newOrder);
    });

    it('should reset form', () => {
        this.form = spyOn(testComponent.form, 'reset');
        testComponent.resetForm();
        expect(testComponent.form.reset).toHaveBeenCalled();
    });
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    })
})
