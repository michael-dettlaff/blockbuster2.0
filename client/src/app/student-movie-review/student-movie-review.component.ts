import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewService } from '../review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-movie-review',
  templateUrl: './student-movie-review.component.html',
  styleUrls: ['./student-movie-review.component.css']
})
export class StudentMovieReviewComponent implements OnInit {

  constructor(private reviewService: ReviewService, private router: Router) { }

  reviewMovie:any;
  selectedVal: Number = 0;
  student:any;

  ngOnInit(): void {

    this.getTitle();

    let user;
    let url = window.location.href.split('/');
    let movie;
    for(let i = 0; i < url.length; i++){
      if (url[i] == 'student') {
        user = url[i+1];
        this.student = user;
      } else if (url[i] == 'makeReview'){
        movie = url[i+1];
        //this.reviewMovie = movie;
      }
    };
  }
  
  onSubmit(f: NgForm){

    let desc = f.value['review'];
    this.reviewService.createReview(this.student, this.reviewMovie, this.selectedVal, desc);
    this.router.navigate(['/student/'+this.student+'/movieSearch']);
    alert(this.reviewMovie + ' added to your reviews!');
    
  }

  radioChangeHandler (event: any) {
    this.selectedVal = event.target.value; 
  }

  getTitle(){
    let params = new URLSearchParams(window.location.search);
    let movie = params.get('title');
    this.reviewMovie = movie;
  }

}
