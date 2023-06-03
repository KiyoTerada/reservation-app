import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from "moment";
import { Router } from "@angular/router";

const jwt = new JwtHelperService();

class DecordedToken{
    userId: string = ''
    username: string = ''
    exp: number = 0
}

@Injectable()
export class AuthService {
    private decordedToken

    constructor(
        private http: HttpClient,
        private router: Router
        ) {
        this.decordedToken = JSON.parse(localStorage.getItem('app-meta')) || new DecordedToken
     }

    // getProducts(): Observable<any>{
    //     return this.http.get('/api/v1/products')
    // }

     getToekn(){
        return localStorage.getItem('app-auth')
     }


    isAuthenticated(){
        return moment().isBefore(moment.unix(this.decordedToken.exp))
    }

    register(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/register', userData)
    }

    login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/login', userData).pipe(map(
            (token: any) => {
                this.decordedToken = jwt.decodeToken(token)
                localStorage.setItem('app-auth', token)
                localStorage.setItem('app-meta', JSON.stringify(this.decordedToken))
                return token
            }
        ))
    }
    logout(){
        localStorage.removeItem('app-auth')
        localStorage.removeItem('app-meta')
        this.decordedToken = new DecordedToken()
        this.router.navigate(['/login'])
    }
}