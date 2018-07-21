import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Http } from '../../../../../node_modules/@angular/http';

@Injectable()
export class AuthenticationService {
    // constructor(private http: HttpClient) { }

    // login(username: string, password: string) {
    //     return this.http.post<any>('/api/authenticate', { username: username, password: password })
    //     .pipe(map((res: any) => {
    //         if (res && res.token) {
    //             localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));

    //         }
    //     }))
    // }
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('http://localhost:8080/api/authenticate', { username: username, password: password })
        .pipe(map((res: any) => {
            res = res.json();
            if (res && res.token) {
                localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
            }
        }))
    }
    logout() {
        // remove user from the local storage to log out
        // TODO: Find a more secure way to do this.
        console.log('logging the user out');
        localStorage.removeItem('currentUser');
    }
}
