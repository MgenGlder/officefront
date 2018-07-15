import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Response, ResponseOptions } from '@angular/http';
import { of } from 'rxjs';
import { DataTableModule } from '../../../../../../node_modules/angular2-datatable';
import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
import { DataFilterPipe } from '../../plugins/datatable/datafilterpipe';
import { ViewOrderComponent } from './view-order.component';

class MockPatientService {
    getAllPatients() {
        return of(new Response(
            new ResponseOptions({
                body: {
                    data: 'somePatientData'
                }
            })
        ))
    }
}

class MockOrderService {
    getAllOrders() {
        return of(new Response(
            new ResponseOptions({
                body: {
                    data: 'someOrderData'
                }
            })
        ))
    }
}

describe('ViewOrderComponent', () => {
    let viewOrderComponent: ViewOrderComponent;
    let fixture: ComponentFixture<ViewOrderComponent>;
    const mockPatientService: MockPatientService = new MockPatientService();
    const mockOrderService: MockOrderService = new MockOrderService();

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                DataTableModule
            ],
            providers: [
                { provide: OrderService, useValue: mockOrderService },
                { provide: PatientService, useValue: mockPatientService }
            ],
            declarations: [
                ViewOrderComponent,
                DataFilterPipe
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ViewOrderComponent);
        viewOrderComponent = fixture.componentInstance;
    });
    it('should get order data on init', () => {
        expect(viewOrderComponent.orderData).toEqual({
            data: 'someOrderData'
        });
    });

    it('should get patient data on init', () => {
        expect(viewOrderComponent.patientData).toEqual({
            data: 'somePatientData'
        });
    });
    it('should unsubscribe from patient subscription and order subscription', () => {
        spyOn(viewOrderComponent.patientsSubscription, 'unsubscribe')
        spyOn(viewOrderComponent.ordersSubscription, 'unsubscribe')
        viewOrderComponent.ngOnDestroy();
        expect(viewOrderComponent.patientsSubscription.unsubscribe).toHaveBeenCalled();
        expect(viewOrderComponent.ordersSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should convert string of int to an actual int', () => {
        expect(viewOrderComponent.toInt('2')).toEqual(2);
    })

    it('should sort by word length', () => {
        expect(viewOrderComponent.sortByWordLength({
            name: 'Kunle'
        })).toEqual(5);
    })
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    });
})
