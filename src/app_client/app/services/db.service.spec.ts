import { DBService } from './db.service'
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { Observable, of } from 'rxjs';

class SpyHttpAndClassToSpyOnClass {

    public static createHttpGetSpy(http: Http, responseObject: [{ value: String, text: String }]) {
        const responseObservable = this.createResponseObservable(responseObject);
        return spyOn(http, 'get').and.returnValues(responseObservable);
    }
    public static createResponseObservable(responseObject: [{ value: String, text: String }]): Observable<Response> {
        return of(new Response(new ResponseOptions({
            body: responseObject
        })));
    }
}

describe('DBService', () => {
    let service: DBService;
    let newHttp;
    beforeEach(() => {
        newHttp = new Http(new MockBackend(), new BaseRequestOptions());
    })
    it('should make call to get bloodwork data from db', async() => {
        SpyHttpAndClassToSpyOnClass.createHttpGetSpy(newHttp, [{value: 'podiatrist', text: 'Podiatrist'}])
        service = new DBService(newHttp);
        const result = service.getBloodworkOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('podiatrist');
        }));
    })
    it('should save bloodwork data from db', async() => {
        SpyHttpAndClassToSpyOnClass.createHttpGetSpy(newHttp, [{ value: 'rn-monitor-bp', text: 'Monitor BP' }])
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
