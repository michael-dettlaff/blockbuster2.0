import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myGif:string = '/assets/gifs/minions.gif';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.loginService.login(f.value['username'], f.value['password']);
    console.log("logging ing");
  }

  
  
}
