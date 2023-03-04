import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewService } from '../review.service';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent implements OnInit {

  teacher:any;
  student:any;
  movie:any;
  review:any;
  name:any;

  constructor(private reviewService: ReviewService, private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
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
      if(url[i] == 'review'){
        this.movie = url[i+1];
        this.movie = this.movie.replace(/%20/g, " ");
      }
    };

    this.name = this.teacherService.getName(this.student).subscribe( res => {
      this.name = res;
    });
    
    this.getReview();
  }

  getReview(){
    this.reviewService.getSpecificReview(this.student, this.movie).subscribe( rev => {
      this.review = rev; 
    });
  }

  onSubmit(f: NgForm) {

    let result = confirm("Is this the grade/feedback you want to give?");
    if(result == true){
      let feedback = f.value['feedback'];
      let grade = f.value['grade'];
      this.reviewService.gradeReview(feedback, grade, this.student, this.movie);
      //window.location.href = '/teacher/'+this.teacher+'/student/'+this.student;
      this.router.navigate(['/teacher/'+this.teacher+'/student/'+this.student]);
    }
  }
}
