import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DBService } from '../../../services/db.service';
import { OrderBuilderService } from '../../../services/order-builder.service';
import { OrderService } from '../../../services/order.service';
import { PatientService } from './../../../services/patient.service';
import { NewOrderComponent } from './new-order.component';
import { Order } from '../../../models/pending-order.model';

@Component({
    template: `<router-outlet></router-outlet>`
  })
  export class BlankComponent {
  }


describe('NewOrderComponent', () => {
    let httpMock;
    let fixture: ComponentFixture<NewOrderComponent>;
    let newOrderComponent: NewOrderComponent;
    let orderService: OrderService;
    beforeEach(() => {
        // tslint:disable-next-line
        localStorage.setItem('currentUser',`{"username":"MgenGlder","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjZhMzdhNDI3NGJlZDg3MWM0MzE2MmEiLCJlbWFpbCI6InNvbWV0dGhpbmdAaG90bWFpbC5jb20iLCJuYW1lIjoiS3VubGUgT3NoaXlveWUiLCJleHAiOjE1NDQ3Mzg5OTAsImlhdCI6MTU0NDczODA5MH0.gh-2K4LEpNbutAHAfroirvHUYQc4h9fdXIU4zFVfg7A"}`)
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule,
                HttpClientModule,
                RouterTestingModule.withRoutes([{path: 'orders/new/submitted', component: BlankComponent}])
            ],
            providers: [
                OrderBuilderService,
                OrderService,
                PatientService,
                DBService
            ],
            declarations: [
                NewOrderComponent,
                BlankComponent
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(NewOrderComponent);
        newOrderComponent = fixture.componentInstance;
        orderService = TestBed.get(OrderService);
    });

    it('should get patients from patientService on load', () => {
        const req = httpMock.expectOne({
            method: 'GET'
        });
        expect(req.request.url.endsWith('/api/patients/all')).toBeTruthy();
    });

    it('should submit orders on form submit', async(() => {
        fixture.detectChanges();
        newOrderComponent.patientProfile = {
            dateOfBirth: '07/30/1993',
            firstName: 'Kunle',
            lastName: 'Oshi'
        }
        orderService.addOrder(new Order('', '', '', '', ''));
        fixture.detectChanges();
        spyOn(newOrderComponent.orderService, 'submitOrder').and.callThrough();
        newOrderComponent.submitOrder();
        fixture.detectChanges();
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

    }));
    it('should call getOrders on app init', () => {
        spyOn(newOrderComponent.orderService, 'getOrders');
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
