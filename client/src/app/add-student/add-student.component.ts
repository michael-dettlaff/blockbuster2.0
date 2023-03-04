import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { TeacherService } from '../teacher.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private teacherService : TeacherService) { }

  teacher:any;
  roleSelected:any;

  ngOnInit(): void {
    this.roleSelected = 'Student';
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        this.teacher = url[i+1];
      }
    };
  }

  onRoleSelected(val:any){
    this.roleSelected = val;
  }

  onSubmit(f: NgForm) {

    if(f.value['roleSelect'] == 'Teacher'){
      this.addTeacher(f.value.firstname, f.value.lastname, f.value['username'], f.value['password']);
    } else if (f.value['roleSelect'] == 'Student') {
      this.addStudent(f.value.firstname, f.value.lastname, f.value['username'], f.value['password']);
    }
  }

  async addStudent( first: string, last: string, username: string, password: string ) {
    this.teacherService.addStudent(first, last, username, password, this.teacher);
  }

  async addTeacher(first: string, last: string, username: string, password: string) {
    this.teacherService.addTeacher(first, last, username, password, this.teacher);
  }
}
