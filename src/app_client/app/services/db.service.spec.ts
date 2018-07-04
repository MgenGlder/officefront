import { DBService } from './db.service'
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { of } from 'rxjs';


describe('DBService', () => {
    let service: DBService;
    let spyHttp;
    beforeEach(() => {
        const newHttp = new Http(new MockBackend(), new BaseRequestOptions());
        spyHttp = spyOn(newHttp, 'get')
            .and
            .returnValues(of(new Response(new ResponseOptions({
                body: [{value: 'podiatrist', text: 'Podiatrist'}]
            }))));
        service = new DBService(newHttp);
    })
    it('should make call to get bloodwork data from db', async() => {
        const result = service.getBloodworkOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('podiatrist');
        }));
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
