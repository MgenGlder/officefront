import { DBService } from './db.service'
import { Http, BaseRequestOptions, ConnectionBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'


describe('DBService', () => {
    let service: DBService;
    beforeEach(() => {
        service = new DBService(new Http(new MockBackend(), new BaseRequestOptions()));
    })
    it('should get bloodwork data from db', () => {
    })
    it('should get nursing data from db' () => {
    })
    it('should get testing data from db' () => {
    })
    it('should get specialist data from db' () => {
    })

})