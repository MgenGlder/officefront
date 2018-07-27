import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from '../../../../../../node_modules/angular2-datatable';
import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
import { DataFilterPipe } from '../../plugins/datatable/datafilterpipe';
import { DBService } from './../../../services/db.service';
import { ViewOrderComponent } from './view-order.component';

describe('ViewOrderComponent', () => {
    let viewOrderComponent: ViewOrderComponent;
    let fixture: ComponentFixture<ViewOrderComponent>;
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                DataTableModule,
                HttpClientTestingModule
            ],
            providers: [
                OrderService,
                PatientService,
                DBService
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
    it('should get order data on init', async(inject([HttpClient, HttpTestingController],
        (httpClient: HttpClient, backend: HttpTestingController) => {
            let orderRequest: TestRequest = null;
            const req = backend.match({
                method: 'GET',
            });
            for (const requestObject of req) {
                if (requestObject.request.url.endsWith('/api/orders/all')) {
                    orderRequest = requestObject;
                }
            }
            expect(orderRequest).not.toBeNull();
            orderRequest.flush({
                body: 'testData'
            });
            expect(viewOrderComponent.orderData).toEqual({
                body: 'testData'
            });
        })));

    it('should get patient data on init', async(inject([HttpClient, HttpTestingController],
        (httpClient: HttpClient, backend: HttpTestingController) => {

            let patientRequest: TestRequest = null;
            const req = backend.match({
                method: 'GET',
            });
            for (const requestObject of req) {
                if (requestObject.request.url.endsWith('/api/patients/all')) {
                    patientRequest = requestObject;
                }
            }
            expect(patientRequest).not.toBeNull();
            patientRequest.flush({
                body: 'testData'
            });
            expect(viewOrderComponent.patientData).toEqual({
                body: 'testData'
            });
        })
    ));
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
