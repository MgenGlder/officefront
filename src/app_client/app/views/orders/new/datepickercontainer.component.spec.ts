import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerContainerComponent } from './datepickercontainer.component';

fdescribe('DatePickerContainerComponent', () => {
    let datePickerContainer: DatePickerContainerComponent;
    let fixture: ComponentFixture<DatePickerContainerComponent>;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                DatePickerContainerComponent
            ],
            imports: [
                FormsModule,
                DatepickerModule.forRoot()
            ]
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(DatePickerContainerComponent);
        datePickerContainer = fixture.componentInstance;
    });
    it('should set tomorrow as the correct date on init', () => {
        let testDate;
        (testDate = new Date()).setDate(testDate.getDate() + 1);
        expect(datePickerContainer.tomorrow.getDate()).toEqual(testDate.getDate());
    });
    it('should set after tomorrow as the correct date on init', () => {
        let testDate;
        (testDate = new Date()).setDate(testDate.getDate() + 2);
        expect(datePickerContainer.afterTomorrow.getDate()).toEqual(testDate.getDate());
    });
    it('should set the minimum date to the correct date on init', () => {
        let testDate;
        (testDate = new Date()).setDate(testDate.getDate() - 1000);
        expect(datePickerContainer.minDate.getDate()).toEqual(testDate.getDate());
    });
    it('should get the correct date', () => {
        const testDate = new Date();
        datePickerContainer.dt = testDate;
        expect(datePickerContainer.getDate()).toEqual(testDate.getTime());
        datePickerContainer.dt = null;
        expect(datePickerContainer.getDate()).toEqual(new Date().getTime());
    });
    it('should get today', () => {
        datePickerContainer.today();
        expect(datePickerContainer.dt.getDate()).toEqual(new Date().getDate());
    });
    it('shout get day class', () => {
        const testTomorrowDate = new Date();
        datePickerContainer.events = [
            { date: new Date(), status: 'testStatus' },
            { date: testTomorrowDate, status: 'testOtherStatus' }
        ];
        expect(datePickerContainer.getDayClass(new Date(), 'day')).toEqual('testStatus')
        expect(datePickerContainer.getDayClass(new Date(), '')).toEqual('');
    });

    it('should check if date is disabled on weekends', () => {
        const testDateSaturday = new Date('July 14, 2018 12:00:00 GMT-4:00');
        expect(datePickerContainer.disabled(testDateSaturday, 'day')).toEqual(true)
        const testDateSunday = new Date('July 15, 2018 12:00:00 GMT-4:00');
        expect(datePickerContainer.disabled(testDateSunday, 'day')).toEqual(true);
        const testDateMonday = new Date('July 16, 2018 12:00:00 GMT-4:00');
        expect(datePickerContainer.disabled(testDateMonday, 'day')).toEqual(false);
    });

    it('should toggle opened flag', () => {
        datePickerContainer.opened = false;
        datePickerContainer.open();
        expect(datePickerContainer.opened).toEqual(true);
        datePickerContainer.opened = true;
        datePickerContainer.open();
        expect(datePickerContainer.opened).toEqual(false);
    });
    it('should clear date stored', () => {
        datePickerContainer.clearDate();
        expect(datePickerContainer.dt).toBeUndefined();
    });
    it('should toggle min', () => {
        let testDate;
        (testDate = new Date()).setDate(testDate.getDate() - 1000);
        datePickerContainer.toggleMin();
        expect(datePickerContainer.dt.getDate()).toEqual(testDate.getDate());
    });
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    });

});
