import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-student-update-movies',
  templateUrl: './student-update-movies.component.html',
  styleUrls: ['./student-update-movies.component.css']
})
export class StudentUpdateMoviesComponent implements OnInit {

  constructor(private reviewService: ReviewService) { }

  reviews:any;
  student:any;

  ngOnInit(): void {

    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'student'){
        user = url[i+1];
        this.student = user;
        console.log( 'student is ' + user);
      }
    };
    this.reviewService.filterResults(this.student, 'Review Grade', 'NA').subscribe( res =>{
      console.log(res);
      this.reviews = res;
    });
  }
}
