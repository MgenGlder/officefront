import { mock } from './../../../../utils/mock';
import { DBService } from './../../../../services/db.service';
import { OrderService } from './../../../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ViewSpecificOrderComponent } from './view-specific-order.component';


describe('ViewSpecificOrderComponent', () => {
    const dbMock = mock(DBService);
    const orderMock = mock(OrderService);
    let fixture: ComponentFixture<ViewSpecificOrderComponent>;
    let viewSpecificOrderComponent: ViewSpecificOrderComponent;
    beforeEach(async () => {

        orderMock.getOrder = () => {
            return {
                toPromise: () => {
                    return Promise.resolve({})
                }
            }
        }
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        params: of(
                            {
                                id: '244'
                            }
                        )
                    }
                },
                {provide: OrderService, useValue: orderMock},
                {provide: DBService,  useValue: dbMock}
            ],
            imports: [
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule
            ],
            declarations: [
                ViewSpecificOrderComponent
            ]
        })
        await TestBed.compileComponents();
        fixture = TestBed.createComponent(ViewSpecificOrderComponent);
        viewSpecificOrderComponent = fixture.componentInstance;
    });
    it('should get correct route params on init', () => {
        viewSpecificOrderComponent.ngOnInit();
        expect(viewSpecificOrderComponent.id).toEqual('244');
    });

    it('should unsubscribe on destroy event', () => {
        viewSpecificOrderComponent.ngOnInit();
        spyOn(viewSpecificOrderComponent.paramSubscription, 'unsubscribe');
        viewSpecificOrderComponent.ngOnDestroy();
        expect(viewSpecificOrderComponent.paramSubscription.unsubscribe).toHaveBeenCalled();
    })
})
