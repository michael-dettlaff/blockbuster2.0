import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewService } from '../review.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  reviews:any;
  student:any;
  filterSelected:any;
  studentName:any;


  constructor(private reviewService: ReviewService, private studentService: StudentService) { }

  ngOnInit(): void {

    this.filterSelected = 'Movie Rating';

    let user;
    let url = window.location.href.split('/');
    for(let i = 0; i < url.length; i++){
      if(url[i] == 'student'){
        user = url[i+1];
        this.student = user;
      }
    };

    this.studentService.getName(this.student).subscribe( res => {
      this.studentName = res;
    });

    

    this.reviewService.getReviews(this.student)
      .subscribe( revs => {
        this.reviews = revs;
      });
  }

  clear(){

    this.reviewService.getReviews(this.student)
      .subscribe( revs => {
        this.reviews = revs;
      });

  }

  onFilterSelected(val:any){
    this.filterSelected = val;
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
            console.log('valid input');
            this.reviewService.filterResults(this.student, f.value['filterSelect'], f.value['query']  )
            .subscribe( revs => {
            this.reviews = revs;
          });  
        }
      }
    }  else {
        this.reviewService.filterResults(this.student, f.value['filterSelect'], f.value['query']  )
        .subscribe( revs => {
          this.reviews = revs;
        });  
    }
  }

}
