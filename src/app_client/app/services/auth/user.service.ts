import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user.model';
import { Http } from '../../../../../node_modules/@angular/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // constructor(private http: HttpClient) {}

    // getAll() {
    //     return this.http.get<User[]>('/api/users');
    // }
    constructor(private http: Http) {}

    getAll() {
        return this.http.get('/api/users');
    }
}
