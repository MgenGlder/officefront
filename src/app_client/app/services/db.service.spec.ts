import { DBService } from './db.service'
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { of } from 'rxjs';


describe('DBService', () => {
    let service: DBService;
    let spyHttp;
    let newHttp;
    beforeEach(() => {
        newHttp = new Http(new MockBackend(), new BaseRequestOptions());

    })
    it('should make call to get bloodwork data from db', async() => {
        spyHttp = spyOn(newHttp, 'get')
        .and
        .returnValues(of(new Response(new ResponseOptions({
            body: [{value: 'podiatrist', text: 'Podiatrist'}]
        }))));
        service = new DBService(newHttp);
        const result = service.getBloodworkOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('podiatrist');
        }));
    })
    it('should save bloodwork data from db', async() => {
        spyHttp = spyOn(newHttp, 'get')
        .and
        .returnValues(of(new Response(new ResponseOptions({
            body: [{ value: 'rn-monitor-bp', text: 'Monitor BP' }]
        }))));

        service = new DBService(newHttp);
        const result = service.getNurseOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('rn-monitor-bp');
        }))
    })
    xit('should save nursing data from db', () => {
    })
    xit('should save testing data from db', () => {
    })
    xit('should save specialist data from db', () => {
    })
})
