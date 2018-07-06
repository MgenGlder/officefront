import { OrderContainerComponent } from './order-container.component';
import { OrderService } from '../../../../../services/order.service';
import { DBService } from '../../../../../services/db.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';
import { Order } from '../../../../../models/pending-order.model';

describe('OrderContainerComponent', () => {
    let mockOrderService: OrderService;
    let dbService;
    let fakeHttp;
    let testComp;
    let orderService;
    beforeEach(() => {
        fakeHttp = new Http(new MockBackend(), new BaseRequestOptions());
        dbService = new DBService(fakeHttp);
        mockOrderService = new OrderService(dbService);
        TestBed.configureTestingModule({
            providers: [
                OrderContainerComponent,
                {
                    provide: OrderService, useValue: mockOrderService
                }
            ]
        });
        testComp = TestBed.get(OrderContainerComponent);
        orderService = TestBed.get(OrderService);
    });
    it('should determine type of order on init', () => {
        testComp.order =  new Order('', '', '', '', '')
        testComp.order.typeOfOrder = 'bloodwork';
        testComp.ngOnInit();
        expect(testComp.type).toEqual('bloodwork');
    });
    it('should delete order', () => {
        // TODO: Finish the delete order test
    })
})
