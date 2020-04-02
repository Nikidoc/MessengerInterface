import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessengerService} from './messenger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:8090/auth/registration";
  private _loginUrl = "http://localhost:8090/auth/login";


  constructor(private http: HttpClient,
              private _messengerService: MessengerService) { }

   registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
   }

   loginUser(user){
    return this.http.post<any>(this._loginUrl, user);
   }

   logIn(){
    return !!localStorage.getItem('token');
   }

   logOut(){
    localStorage.removeItem('token');
    localStorage.clear();
    this._messengerService.clear();
   }

   getToken(){
    return localStorage.getItem('token');
   }

}
