import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-review-view',
  templateUrl: './student-review-view.component.html',
  styleUrls: ['./student-review-view.component.css']
})
export class StudentReviewViewComponent implements OnInit {

  student:any;
  movie:any;
  review:any;
  name:any;

  constructor(private reviewService: ReviewService, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {

    let user="";
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'student'){
        user = url[i+1];
        this.student = user;
      }
      if(url[i] == 'review'){
        this.movie = url[i+1];
        this.movie = this.movie.replace(/%20/g, " ");
      }
    };

    this.studentService.getName(this.student).subscribe(res => {
      this.name = res;
    });

    this.getReview();
  }


  getReview(){
    this.reviewService.getSpecificReview(this.student, this.movie).subscribe( rev => {
      //console.log(rev);
      this.review = rev; 
    });
  }

  deleteReview(){
    let result = confirm('Are you sure you want to delete this review?');
    if(result == true){
      this.reviewService.deleteRev(this.student, this.movie);
      //window.location.href = 'student/'+this.student+'';
      this.router.navigate(['student/'+this.student]);
    }
  }

}
