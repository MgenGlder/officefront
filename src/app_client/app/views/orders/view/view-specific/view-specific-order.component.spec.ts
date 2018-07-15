import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { mock } from '../../../../utils/mock';
import { ViewSpecificOrderComponent } from './view-specific-order.component';

describe('ViewSpecificOrderComponent', () => {
    let fixture: ComponentFixture<ViewSpecificOrderComponent>;
    let viewSpecificOrderComponent: ViewSpecificOrderComponent;
    const mockHttp: Http = mock(Http.prototype);
    mockHttp.get = () => void 0;
    beforeEach(() => {

        spyOn(mockHttp, 'get').and.returnValue(
            of(
                new Response(
                    new ResponseOptions(
                        {
                            body: {
                                data: 'someData'
                            }
                        }
                    ))));
        TestBed.configureTestingModule({
            providers: [
                { provide: Http, useValue: mockHttp },
                { provide: ActivatedRoute, useValue: {
                    params: of(
                        {
                            id: '244'
                        }
                    )
                } }
            ],
            imports: [
                RouterTestingModule
            ],
            declarations: [
                ViewSpecificOrderComponent
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ViewSpecificOrderComponent);
        viewSpecificOrderComponent = fixture.componentInstance;
        viewSpecificOrderComponent.route.params = of(
            {
                id: '244'
            }
        )
    });
    it('should get correct route params on init', () => {
        viewSpecificOrderComponent.ngOnInit();
        expect(viewSpecificOrderComponent.id).toEqual(+'244');
    });

    it('should unsubscribe on destroy event', () => {
        viewSpecificOrderComponent.ngOnInit();
        spyOn(viewSpecificOrderComponent.sub, 'unsubscribe');
        viewSpecificOrderComponent.ngOnDestroy();
        expect(viewSpecificOrderComponent.sub.unsubscribe).toHaveBeenCalled();
    })
})
