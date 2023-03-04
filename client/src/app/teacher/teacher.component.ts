import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { TeacherService } from '../teacher.service';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private teacherService: TeacherService) { }

  students: any;
  teacher:any;
  name:any;

  ngOnInit(): void {

    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
      }
    };
    this.teacher = user;

    this.name = this.teacherService.getName(this.teacher).subscribe( res => {
      //console.log(res);
      this.name = res;
    });

    this.getMyStudents();
  }

  getMyStudents(){
    this.teacherService.getStudents(this.teacher).
      subscribe(studs => {
        //console.log(studs);
        this.students = studs;
      });
  }

  getStudent(){

    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
      }
    };
    this.teacher = user;
  }

}
