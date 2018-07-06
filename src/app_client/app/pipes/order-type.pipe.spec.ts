import { OrderNameTransformPipe } from './order-type.pipe';

describe('OrderNameTransformPipe', () => {
    let pipe: OrderNameTransformPipe;
    beforeEach(() => {
        pipe = new OrderNameTransformPipe();
    })
    it('should transform order names with dashes in them', () => {
        expect(pipe.transform('order-name')).toEqual('Order Name');
    })
})
