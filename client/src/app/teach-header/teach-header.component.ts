import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-teach-header',
  templateUrl: './teach-header.component.html',
  styleUrls: ['./teach-header.component.css']
})
export class TeachHeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  teacher:any;

  ngOnInit(): void {
    this.teacher = this.getEmail();
  }

  getEmail(){
    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
        this.teacher = user;
      }
    };
    return user;
  }

  logout(){
    this.loginService.logout();
  }

}
