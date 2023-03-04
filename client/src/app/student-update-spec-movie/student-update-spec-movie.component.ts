import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-student-update-spec-movie',
  templateUrl: './student-update-spec-movie.component.html',
  styleUrls: ['./student-update-spec-movie.component.css']
})
export class StudentUpdateSpecMovieComponent implements OnInit {

  constructor(private reviewService: ReviewService) { }

  student:any;
  movie:any;
  reviews: any[] = [];
  selectedVal: Number = 0;
  newReview:any="";

  data:any={};

  ngOnInit(): void {

    let user;
    let url = window.location.href.split('/');
    let movie;
    for(let i = 0; i < url.length; i++){
      if (url[i] == 'student') {
        user = url[i+1];
        this.student = user;
      } else if (url[i] == 'updateMovie'){
        movie = url[i+1];
        movie = movie.replace(/%20/g, ' ');
        this.movie = movie;
      }
    };

    this.reviewService.getSpecificReview(this.student, this.movie).subscribe( res => {
      console.log(res);
      this.reviews[0] = res;
    });
  }

  radioChangeHandler (event: any) {
    this.selectedVal = event.target.value; 
  }

  textAreaChangeHandler( event: any){
    this.newReview = event.target.value;
  }

  onSubmit(f: NgForm){
    this.reviewService.updateRev(this.student, this.movie, this.selectedVal, this.newReview);
  } 
}
