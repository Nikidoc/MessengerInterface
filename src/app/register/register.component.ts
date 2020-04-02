import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {firstName:"",
    lastName:"",
    email:"",
    username:"",
    password:""};
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          alert("You was registered");
          this._router.navigate([""]);
        },
        err => {
          console.log(err);
          alert(err.error);
        }
      )
  }

}
