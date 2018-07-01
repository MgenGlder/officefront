import { DBService } from './db.service'
import { Http, BaseRequestOptions, ConnectionBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'


describe('DBService', () => {
    let service: DBService;
    beforeEach(() => {
        service = new DBService(new Http(new MockBackend(), new BaseRequestOptions()));
    })
    it('should get bloodwork data from', () => {
    })

})
