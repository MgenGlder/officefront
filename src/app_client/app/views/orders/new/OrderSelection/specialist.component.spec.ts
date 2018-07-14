import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecialistOrder } from '../../../../models/pending-order.model';
import { DBService } from '../../../../services/db.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { OrderService } from '../../../../services/order.service';
import { mock } from '../../../../utils/mock';
import { SpecialistComponent } from './specialist.component';


describe('SpecialistComponent', () => {

    let fixture: ComponentFixture<SpecialistComponent>;
    let specialistComponent;
    let orderService: OrderService;
    beforeEach(() => {
        const fb = mock(FormBuilder.prototype, 'FormBuilder');
        const orderBuilderService = mock(OrderBuilderService.prototype, 'OrderBuilderService');
        const router = mock(Router.prototype, 'Router');
        const db = mock(DBService.prototype, 'DBService');

        db.getSpecialistOptions.and.returnValue([new SpecialistOrder(
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
                SpecialistComponent
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
        fixture = TestBed.createComponent(SpecialistComponent);
        specialistComponent = fixture.componentInstance;
    })
    it('should submit on submit', () => {
        const date = new Date();
        spyOn(specialistComponent.form, 'get').and.returnValues(
            { value: 'specialist' },
            { value: 'notes' },
            { value: 'location' },
            { value: 'reason' }
        )
        specialistComponent.order =  new SpecialistOrder(
            '',
            '',
            '',
            '',
            `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            '',
            ''
        )
        specialistComponent.onSubmit();
        expect(orderService.addOrder).toHaveBeenCalledWith(
            new SpecialistOrder(
                'specialist',
                'reason',
                'location',
                'notes',
                `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                '',
                ''
            )
        )
    }
    );

    it('should select tab', () => {
        specialistComponent.staticTabs = { tabs: [{ active: false }] };
        specialistComponent.selectTab(0);
        expect(specialistComponent.staticTabs.tabs[0].active).toBeTruthy();
    });

    it('should save', () => {
        const newOrder = new SpecialistOrder(
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        );
        specialistComponent.order = newOrder;
        specialistComponent.save();
        expect(specialistComponent.orderService.addOrder).toHaveBeenCalledWith(newOrder);
    });

    it('should reset form', () => {
        this.form = spyOn(specialistComponent.form, 'reset');
        specialistComponent.resetForm();
        expect(specialistComponent.form.reset).toHaveBeenCalled();
    });
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    })
})
