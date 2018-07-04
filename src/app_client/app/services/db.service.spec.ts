import { DBService } from './db.service'
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { Observable, of } from 'rxjs';

class SpyHttpAndClassToSpyOnClass {

    public static createHttpGetSpy(http: Http, responseObject: [{ value: String, text: String, location?: Boolean }]) {
        const responseObservable = this.createResponseObservable(responseObject);
        return spyOn(http, 'get').and.returnValues(responseObservable);
    }
    public static createResponseObservable(responseObject: [{ value: String, text: String, location?: Boolean }]): Observable<Response> {
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
        SpyHttpAndClassToSpyOnClass.createHttpGetSpy(newHttp, [{ value: 'hgb-aic-level', text: 'Hgb. AIC Level' }])
        service = new DBService(newHttp);
        const result = service.getBloodworkOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('hgb-aic-level');
        }));
    })
    it('should make call to get nursing data from db', async() => {
        SpyHttpAndClassToSpyOnClass.createHttpGetSpy(newHttp, [{ value: 'rn-monitor-bp', text: 'Monitor BP' }])
        service = new DBService(newHttp);
        const result = service.getNurseOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('rn-monitor-bp');
        }))
    })
    it('should make call to get testing data from db', async() => {
        SpyHttpAndClassToSpyOnClass.createHttpGetSpy(newHttp, [{ value: 'x-ray', text: 'X-Ray', location: true }])
        service = new DBService(newHttp);
        const result = service.getTestOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('x-ray');
        }))
    })
    it('should make call to get specialist data from db', async() => {
        SpyHttpAndClassToSpyOnClass.createHttpGetSpy(newHttp, [{ value: 'podiatrist', text: 'Podiatrist' }]);
        service = new DBService(newHttp);
        const result = service.getTestOptions();
        await result.subscribe(((responseObject: Response) => {
            expect(responseObject.json()[0].value).toEqual('podiatrist')
        }))
    })
})
