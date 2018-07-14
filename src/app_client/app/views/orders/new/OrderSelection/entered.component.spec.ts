import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EnteredOrderComponent } from './entered.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('EnteredOrderComponent', () => {
    let fixture: ComponentFixture<EnteredOrderComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            declarations: [
                EnteredOrderComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        params:  of({order: 'someOrder'})
                    }
                }
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EnteredOrderComponent);
    })
    it('should get correct route params', () => {
        const enteredOrderComponent = fixture.componentInstance;
        enteredOrderComponent.ngOnInit();
        expect(enteredOrderComponent.type).toEqual('someOrder');
    });
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    })
});
