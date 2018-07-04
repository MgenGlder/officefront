import { DBService } from './db.service'
import { Http, BaseRequestOptions, ConnectionBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { Observable, of } from 'rxjs';
import { fakeAsync, tick, flushMicrotasks, ComponentFixture } from '@angular/core/testing';


describe('DBService', () => {
    let service: DBService;
    let spy;
    beforeEach(() => {
        service = new DBService(new Http(new MockBackend(), new BaseRequestOptions()));
    })
    it('should make call to get bloodwork data from db', () => {
        const  bloodworkObservable: Observable<{value: String, text: String}> =
        of<{value: string, text: string}>({ value: 'podiatrist', text: 'Podiatrist' });
        spy = spyOn(service, 'getBloodworkOptions').and.returnValue(bloodworkObservable);
        const result = service.getBloodworkOptions();
        result.subscribe(((bloodworkOptions) => {
            console.log(bloodworkOptions);
            expect(bloodworkOptions.value).toEqual('podiatrist');
        }))
        // expect().toBe('podiatrist');
        // TODO: Make this test alot better. My god.
    })
    xit('should save bloodwork data from db', () => {
    })
    xit('should save nursing data from db', () => {
    })
    xit('should save testing data from db', () => {
    })
    xit('should save specialist data from db', () => {
    })
})
