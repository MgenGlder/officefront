import { NewOrderComponent } from './new-order.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OrderService } from '../../../services/order.service';
import { mock } from '../../../utils/mock';

describe('NewOrderComponent', () => {
    const mockOrderService = mock(OrderService);
    let newOrderComponent: ComponentFixture<NewOrderComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                { provide: OrderService, useValue: mockOrderService }
            ],
            declarations: [
                NewOrderComponent
            ]
        })
            .compileComponents();
        newOrderComponent = TestBed.createComponent(NewOrderComponent);
    })
    it('should do things', () => {
        expect(newOrderComponent).toBeDefined();
    });
});
