import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviewMovie:any;
  selectedVal: Number = 0;

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit(): void {
    this.getTitle();
  }

  onSubmit(f: NgForm){

    let user="";
    let url = window.location.href.split('/');
    let role = '';
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
        role = 'teacher';
      } else if (url[i] == 'student') {
        user = url[i+1];
        role = 'student';
      }
    };

    let desc = f.value['review'];
    this.reviewService.createReview(user, this.reviewMovie, this.selectedVal, desc);
    if (role == 'teacher'){
      this.router.navigate(['/teacher/'+user+'/movieSearch']);
      alert(this.reviewMovie + ' added to your reviews!');
      
    } else if (role == 'student') {
      this.router.navigate(['/student/'+user]);
    }
  }

  getTitle(){
    let params = new URLSearchParams(window.location.search);
    let movie = params.get('title');
    this.reviewMovie = movie;
  }

  radioChangeHandler (event: any) {
    this.selectedVal = event.target.value; 
  }

}
