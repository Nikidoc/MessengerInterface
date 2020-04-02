import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {MessengerService} from '../shared/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {username:"",
    password:""};

  constructor(private _auth: AuthService,
              private _router: Router,
              private _messengerService: MessengerService) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this._messengerService.refreshData();
          this._router.navigate(['/']);
        },
        err => {
          console.log(err);
          alert(err.error);
        }
      )
  }

  navigateToRegister(){
    this._router.navigate(['/register']);
  }

}
