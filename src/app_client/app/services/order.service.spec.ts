import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Order } from '../models/pending-order.model';
import { DBService } from './db.service';
import { OrderService } from './order.service';
describe('OrderService', () => {
    let dbService: DBService;
    let orderService: OrderService;
    let date;
    let dateString;
    let newOrder;
    beforeEach(() => {
        date = new Date();
        dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        newOrder = new Order('', '', dateString, 'Adler', 'Kunle Oshiyoye');
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                OrderService,
                DBService
            ]
        });
        dbService = TestBed.get(DBService);
        orderService = TestBed.get(OrderService);
    });
    it('should get all orders ON construction', async(
        inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
            orderService.fetchedOrders.subscribe((data: { body: string }) => {
                expect(data.body).toEqual('some message');
            });
            const req = backend.expectOne({
                method: 'GET'
            });
            req.flush({
                body: 'some message'
            })
            expect(req.request.url.endsWith('/api/orders/all')).toBeTruthy();
        }))
    )
    it('should get all orders', async () => {
        const orders: Observable<Object> = orderService.getAllOrders();
        await orders.subscribe((data) => {
            expect(data).toBeTruthy();
        });
    });
    it('should add an order', () => {
        expect(orderService.getOrders()).toEqual([]);
        orderService.addOrder(newOrder);
        expect(orderService.getOrders()).toEqual([newOrder])
    });
    it('should remove the order', () => {
        orderService.addOrder(newOrder);
        orderService.removeOrder(newOrder);
        expect(orderService.getOrders()).toEqual([]);
    });
    it('should get prefetched orders', () => {
        orderService.addOrder(newOrder);
        expect(orderService.getOrders()).toEqual([newOrder]);
    });
    it('should submit order to be saved', () => {
        const dbServiceSaveSpy = spyOn(dbService, 'saveCompletePatientOrder')
        const patientProfile = {
            firstName: 'Kunle',
            lastName: 'Oshiyoye',
            dateOfBirth: '07/30/1993'
        }
        orderService.addOrder(newOrder);
        orderService.submitOrder(patientProfile);
        expect(dbServiceSaveSpy).toHaveBeenCalled();
    });
})
