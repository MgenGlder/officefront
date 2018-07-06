import { OrderService } from './order.service';
import { DBService } from './db.service';
import { Http, BaseRequestOptions, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Order } from '../models/pending-order.model';
describe('OrderService', () => {
    let dbService: DBService;
    let orderService: OrderService;
    let date;
    let dateString;
    let newOrder;
    let responseObservable;
    beforeEach(() => {
        date = new Date();
        dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        newOrder = new Order('', '', dateString, 'Adler', 'Kunle Oshiyoye');
        dbService = new DBService(new Http(new MockBackend(), new BaseRequestOptions()));
        orderService = new OrderService(dbService);
        responseObservable = of(new Response(new ResponseOptions({ body: 'some message' })));
        spyOn(dbService, 'getAllOrders').and.callThrough().and.returnValues(responseObservable);
    });
    it('should get all orders ON construction', () => {
        orderService = new OrderService(dbService);
        orderService.getOrders();
        expect(orderService.fetchedOrders).toEqual(responseObservable);
    });
    it('should get all orders', async () => {
        const orders: Observable<Response> = orderService.getAllOrders();
        await orders.subscribe((data) => {
            console.log(data);
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
});
