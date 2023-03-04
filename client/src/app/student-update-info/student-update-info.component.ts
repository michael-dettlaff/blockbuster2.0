import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-update-info',
  templateUrl: './student-update-info.component.html',
  styleUrls: ['./student-update-info.component.css']
})
export class StudentUpdateInfoComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  student:any;

  ngOnInit(): void {
    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'student'){
        user = url[i+1];
      }
    };
    this.student = user;
  }

  newUsername(f: NgForm){
    console.log('newUser');
    if(f.value['username'] != this.student){
      alert('You entered the wrong username!');
    } else {
      if(f.value['newUsername'] != f.value['confirmNewUsername']){
        alert('Usernames are not the same!');
      } else {
        this.studentService.changeUsername(f.value['username'], f.value['password'], f.value['newUsername']);
      }
    }

  }

  newPassword(f: NgForm){
    if(f.value['username'] != this.student){
      alert('You entered the wrong username!');
    } else {
      if(f.value['newPassword'] != f.value['confirmPassword']){
        alert('Passwords are not the same!');
      } else {
        this.studentService.changePassword(f.value['username'], f.value['password'], f.value['newPassword']);
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

  becomeTeacher(){
    let result = confirm('Are you sure you want to become a teacher?');
    if(result == true){
      this.studentService.changeToTeacher(this.student);
    }
  }

}
