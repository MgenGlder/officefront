import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ViewSpecificOrderComponent } from './view-specific-order.component';

describe('ViewSpecificOrderComponent', () => {
    let fixture: ComponentFixture<ViewSpecificOrderComponent>;
    let viewSpecificOrderComponent: ViewSpecificOrderComponent;
    beforeEach(() => {
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
                }
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
        fixture = TestBed.createComponent(ViewSpecificOrderComponent);
        viewSpecificOrderComponent = fixture.componentInstance;
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
