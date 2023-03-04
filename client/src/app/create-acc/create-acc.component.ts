import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css']
})
export class CreateAccComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    if(f.value['password'] != f.value['confirmPassword']){
      alert('Passwords are not the same!');
    } else {
      this.loginService.createNewAcc('mike@gmail.com', f.value['firstname'], f.value['lastname'], f.value['username'], f.value['password']);
    }
  }
}
