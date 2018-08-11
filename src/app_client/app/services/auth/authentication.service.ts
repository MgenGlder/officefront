import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post('http://localhost:8080/api/authenticate', { username: username, password: password })
        .pipe(map((res: any) => {
            if (res && res.token) {
                localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
            }
        }))
    }
    logout() {
        // remove user from the local storage to log out
        // TODO: Find a more secure way to do this.
        localStorage.removeItem('currentUser');
    }
}
