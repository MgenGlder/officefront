import { TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Order } from '../../../../../models/pending-order.model';
import { DBService } from '../../../../../services/db.service';
import { OrderService } from '../../../../../services/order.service';
import { OrderContainerComponent } from './order-container.component';

describe('OrderContainerComponent', () => {
    let mockOrderService: OrderService;
    let dbService;
    let fakeHttp;
    let testComp;
    let spyMockOrderService;
    beforeEach(() => {
        fakeHttp = new Http(new MockBackend(), new BaseRequestOptions());
        dbService = new DBService(fakeHttp);
        mockOrderService = new OrderService(dbService);
        spyMockOrderService = spyOn(mockOrderService, 'removeOrder').and.returnValue('');
        TestBed.configureTestingModule({
            providers: [
                OrderContainerComponent,
                {
                    provide: OrderService, useValue: mockOrderService
                }
            ]
        });
        testComp = TestBed.get(OrderContainerComponent);
    });
    it('should determine type of order on init', () => {
        testComp.order =  new Order('', '', '', '', '')
        testComp.order.typeOfOrder = 'bloodwork';
        testComp.ngOnInit();
        expect(testComp.type).toEqual('bloodwork');
    });
    it('should delete order', () => {
        testComp.order = new Order('', '', '', '', '');

        testComp.ngOnInit();
        testComp.deleteOrder();

        expect(spyMockOrderService).toHaveBeenCalled();
    });
})
