import { Component, OnInit } from '@angular/core';

import { ReviewService } from '../review.service';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  reviews:any;
  student:any;
  teacher:any;
  filterSelected:any;
  studentName:any;

  constructor(private reviewService: ReviewService, private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {

    this.filterSelected = 'Movie Rating';
    
    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'student'){
        user = url[i+1];
        this.student = user;
      }
      if(url[i] == 'teacher'){
        this.teacher = url[i+1];
      }
    };


    this.teacherService.getName(this.student).subscribe(res => {
      //console.log(res);
      this.studentName = res;
    });


    this.reviewService.getReviews(user)
      .subscribe( revs => {
        //console.log(revs);
        this.reviews = revs;
      });
  }

  deleteStudent(){

    let result = confirm("Are you sure you want to delete this student?");
    if(result == true){
      this.teacherService.deleteStudent(this.student)
      .subscribe( del => {
        //window.location.href = '/teacher/'+this.teacher;
        this.router.navigate(['/teacher/'+this.teacher]);
      });
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.value['query'] + ' ' + f.value['filterSelect']);
    if(f.value['query'] == ''){
      alert('This is an empty query');
    } else if (f.value['filterSelect'] == 'Movie Rating'){
      let result = isNaN(f.value['query']);
      if(result == true){
        alert('You must enter an integer to filter by Movie Rating')
      } else {
        if(f.value['query'] > 10 || f.value['query'] < 0){
          alert('Please an integer between 0 and 10 for Movie Rating');
        } else {
            this.reviewService.filterResults(this.student, f.value['filterSelect'], f.value['query']  )
            .subscribe( revs => {
            //console.log(revs);
            this.reviews = revs;
          });  
        }
      }
    } else {
        this.reviewService.filterResults(this.student, f.value['filterSelect'], f.value['query']  )
          .subscribe( revs => {
            //console.log(revs);
            this.reviews = revs;
      });
    }  
  }

  onFilterSelected(val:any){
    this.filterSelected = val;
  }

  clear(){

    this.reviewService.getReviews(this.student)
      .subscribe( revs => {
        //console.log(revs);
        this.reviews = revs;
      });

  }
}
