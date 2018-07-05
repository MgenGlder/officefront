import { OrderBuilderService } from './order-builder.service';
import { OrderService } from './order.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { DBService } from './db.service';
import { MockBackend } from '@angular/http/testing'
import { SpecialistOrder, TestOrder, BloodworkOrder } from '../models/pending-order.model';

describe('OrderBuilderService', () => {
    let http: Http;
    let dbService: DBService;
    let orderService: OrderService;
    let orderBuilder: OrderBuilderService;
    let date: Date;
    let dateString: string;
    beforeEach(() => {
        date = new Date();
        dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        http = new Http(new MockBackend(), new BaseRequestOptions());
        dbService = new DBService(http);
        orderService = new OrderService(dbService);
        orderBuilder = new OrderBuilderService(orderService);
        orderService.referrer = 'Kunle Oshiyoye';
        orderService.visitingDoctor = 'Adler';
    })
    it('should build specialist order', () => {
        orderBuilder.startBuildingSpecialistOrder();
        const specialistOrder = new SpecialistOrder(
            '',
            '',
            '',
            '',
            dateString,
            'Adler',
            'Kunle Oshiyoye'
        )
        expect(orderBuilder.pendingSpecialistOrder).toEqual(specialistOrder);
    })
    it('should build test order', () => {
        orderBuilder.startBuildingTestOrder();
        const testOrder = new TestOrder(
            '',
            '',
            '',
            '',
            dateString,
            'Adler',
            'Kunle Oshiyoye'
        )
        expect(orderBuilder.pendingTestOrder).toEqual(testOrder);
    })
    it('should build bloodwork order', () => {
        orderBuilder.startBuildingBloodworkOrder();
        const bloodworkOrder = new BloodworkOrder(
            [],
            orderBuilder.tests,
            '',
            '',
            '',
            dateString,
            'Adler',
            'Kunle Oshiyoye'
        )
        expect(orderBuilder.pendingBloodworkOrder).toEqual(bloodworkOrder);
    })
});
