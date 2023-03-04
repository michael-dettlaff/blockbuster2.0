import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit {

  constructor(private teacherService: TeacherService) { }

  teacher:any;

  ngOnInit(): void {
    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
      }
    };
    this.teacher = user;
  }


  newUsername(f: NgForm){
    console.log('newUser');
    if(f.value['username'] != this.teacher){
      alert('You entered the wrong username!');
    } else {
      if(f.value['newUsername'] != f.value['confirmNewUsername']){
        alert('Usernames are not the same!');
      } else {
        this.teacherService.changeUsername(f.value['username'], f.value['password'], f.value['newUsername']);
      }
    }

  }

  newPassword(f: NgForm){
    if(f.value['username'] != this.teacher){
      alert('You entered the wrong username!');
    } else {
      if(f.value['newPassword'] != f.value['confirmPassword']){
        alert('Passwords are not the same!');
      } else {
        this.teacherService.changePassword(f.value['username'], f.value['password'], f.value['newPassword']);
      }
    }

  }

  onSubmit(f: NgForm, form:string){

    if(form == 'pass'){
      this.newPassword(f);
    } else if ( form == 'user'){
      this.newUsername(f);
    }
  }

}
