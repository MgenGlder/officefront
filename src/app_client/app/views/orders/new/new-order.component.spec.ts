import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DBService } from '../../../services/db.service';
import { OrderBuilderService } from '../../../services/order-builder.service';
import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
import { mock } from '../../../utils/mock';
import { NewOrderComponent } from './new-order.component';
fdescribe('NewOrderComponent', () => {
    let httpMock;
    let fixture: ComponentFixture<NewOrderComponent>;
    let newOrderComponent: NewOrderComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [
                OrderBuilderService,
                OrderService,
                PatientService,
                DBService
            ],
            declarations: [
                NewOrderComponent
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
        .compileComponents();
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(NewOrderComponent);
        newOrderComponent = fixture.componentInstance;
    });

    it('should get patients from patientService on load', () => {
        const req = httpMock.expectOne({
            method: 'GET'
        });
        expect(req.request.url.endsWith('/api/patients/all')).toBeTruthy();
    });

    it('should submit orders on submit', () => {
        fixture.detectChanges();
        newOrderComponent.patientProfile = {
            dateOfBirth: '07/30/1993',
            firstName: 'Kunle',
            lastName: 'Oshi'
        }
        spyOn(newOrderComponent.orderService, 'submitOrder');
        newOrderComponent.submitOrder();
        expect(newOrderComponent.orderService.submitOrder).toHaveBeenCalledWith({
            dateOfBirth: '07/30/1993',
            firstName: 'Kunle',
            lastName: 'Oshi'
        });

        const req = httpMock.expectOne({
            method: 'POST'
        });

        req.flush({
            body: 'some message'
        })

    });
    it('should call getOrders on app init', () => {
        newOrderComponent.ngOnInit();
        expect(newOrderComponent.orderService.getOrders).toHaveBeenCalled();
    });
    it('should unsubscribe from patientSubscription on destroy', () => {
        spyOn(newOrderComponent.patientsSubscription, 'unsubscribe');
        newOrderComponent.ngOnDestroy();
        expect(newOrderComponent.patientsSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should autocomplete with given data', () => {
        const testData = {
            firstName: 'Kunle',
            lastName: 'Oshi',
            dateOfBirth: '07/30/1992'
        };
        newOrderComponent.firstNameAutoCompleted(testData);
        expect(newOrderComponent.patientProfile).toEqual(testData);
    });

    it('should render correct autocomplete html', () => {
        newOrderComponent.autocompleListFormatter({
            firstName: 'Kunle',
            lastName: 'Oshi',
            dateOfBirth: '07/30/1993'
        });
    });

    it('should toggle time mode to meridian and back', () => {
        newOrderComponent.isMeridian = false;
        newOrderComponent.toggleMode();
        expect(newOrderComponent.isMeridian).toBeTruthy();
        newOrderComponent.isMeridian = true;
        newOrderComponent.toggleMode();
        expect(newOrderComponent.isMeridian).toBeFalsy();
    });

    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    });
});
