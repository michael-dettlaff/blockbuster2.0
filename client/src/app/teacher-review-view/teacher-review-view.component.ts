import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-review-view',
  templateUrl: './teacher-review-view.component.html',
  styleUrls: ['./teacher-review-view.component.css']
})
export class TeacherReviewViewComponent implements OnInit {

  teacher:any;
  name:any;
  movie:any;
  review:any;

  constructor(private reviewService: ReviewService, private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {

    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
        this.teacher = user;
      }
      if(url[i] == 'reviews'){
        this.movie = url[i+1];
        this.movie = this.movie.replace(/%20/g, " ");
      }
    };

    this.name = this.teacherService.getName(this.teacher).subscribe( res => {
      //console.log(res);
      this.name = res;
    });
    this.getReview();
  }

  getReview(){
    this.reviewService.getSpecificReview(this.teacher, this.movie).subscribe( rev => {
      //console.log(rev);
      this.review = rev; 
    });
  }

  deleteReview(){
    let result = confirm('Are you sure you want to delete this review?');
    if(result == true){
      this.reviewService.deleteRev(this.teacher, this.movie);
      //window.location.href = 'teacher/'+this.teacher+'/reviews';
      this.router.navigate(['teacher/'+this.teacher+'/reviews']);
    }
  }
}
