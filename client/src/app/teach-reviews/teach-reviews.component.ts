import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-teach-reviews',
  templateUrl: './teach-reviews.component.html',
  styleUrls: ['./teach-reviews.component.css']
})
export class TeachReviewsComponent implements OnInit {

  reviews:any;
  teacher:any;
  filterSelected:any;

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.filterSelected = 'Movie Rating';
    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
        this.teacher = url[i+1];
        console.log( 'username is ' + user);
      }
    };

    this.reviewService.getReviews(user)
      .subscribe( revs => {
        console.log(revs);
        this.reviews = revs;
      });
  }

  clear(){

    this.reviewService.getReviews(this.teacher)
      .subscribe( revs => {
        console.log(revs);
        this.reviews = revs;
      });

  }

  onFilterSelected(val:any){
    this.filterSelected = val;
    console.log(this.filterSelected);
  }

  onSubmit(f: NgForm) {
    console.log(f.value['query'] + ' test ' + f.value['filterSelect']);
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
            this.reviewService.filterResults(this.teacher, f.value['filterSelect'], f.value['query']  )
            .subscribe( revs => {
            //console.log(revs);
            this.reviews = revs;
        });  
          }
        }
    }else {

      this.reviewService.filterResults(this.teacher, f.value['filterSelect'], f.value['query']  )
        .subscribe( revs => {
          console.log(revs);
          this.reviews = revs;
        });  
    }
  }

  deleteReview(){
    console.log('delete Review');
  }

}
