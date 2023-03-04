import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  
  student:any;

  ngOnInit(): void {

    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'student'){
        this.student = url[i+1];
      }
    };

  }

  logout(){
    this.loginService.logout();
  }

}
