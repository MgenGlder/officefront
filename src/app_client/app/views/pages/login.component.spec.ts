import { AuthenticationService } from './../../services/auth/authentication.service';
import { LoginComponent } from './login.component';
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

// Commented out potential solution for errors being printed during test even though it passes.
describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>, loginComponent: LoginComponent;
    beforeEach(async () => {
        const route = {
            snapshot: {
                queryParams: {
                    returnUrl: 'testUrl'
                }
            }
        }
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                ReactiveFormsModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true},
                AuthenticationService,
                { provide: ActivatedRoute, useValue: route },
                FormBuilder
            ],
            declarations: [
                LoginComponent
            ]
        })
        await TestBed.compileComponents();
        fixture = TestBed.createComponent(LoginComponent)
        loginComponent = fixture.componentInstance;
        // fixture.detectChanges();
    })
    it('should call logout on init', () => {
        // fixture.detectChanges();
        spyOn(loginComponent.authenticationService, 'logout');
        loginComponent.ngOnInit();
        expect(loginComponent.authenticationService.logout).toHaveBeenCalled();
    })
    it('should submit when enter button is pressed', async () => {
        // fixture.detectChanges();
        loginComponent.ngOnInit();
        loginComponent.loginForm.controls['username'].setValue('someUsername');
        loginComponent.loginForm.controls['password'].setValue('somePassword');
        spyOn(loginComponent.authenticationService, 'login').and.callFake(function () {})
        const event: Event = new KeyboardEvent('keyup', {'key': 'Enter'});
        fixture.debugElement.query(By.css('form')).nativeElement.dispatchEvent(event);
        // fixture.debugElement.query(By.css('form')).triggerEventHandler('keyup.enter', {});
        expect(loginComponent.authenticationService.login).toHaveBeenCalled();
    })
})
