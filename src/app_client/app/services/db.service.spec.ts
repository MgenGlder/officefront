import { DBService } from './db.service'
import { Http, BaseRequestOptions, ConnectionBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'


describe('DBService', () => {
    let service: DBService;
    let spy;
    beforeEach(() => {
        service = new DBService(new Http(new MockBackend(), new BaseRequestOptions()));
    })
    it('should make call to get bloodwork data from db', () => {
        spy = spyOn(service, 'getBloodworkOptions').and.callThrough();
        const result = service.getBloodworkOptions();
        expect(result).toBeTruthy();
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
