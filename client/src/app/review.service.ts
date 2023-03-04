import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private router: Router) { }

  createReview(email: string, title: string, rating: Number, rev: string){
    let review = {
      'email' : email,
      'title' : title,
      'rating' : rating,
      'review' : rev
    };
    console.log(review);

    let headers = { 'content-type' : 'application/json' };
    this.http.post('/api/v1/review', review, { 'headers': headers }).subscribe( res => { 
      //console.log(res);
    });
  }

  getReviews(email: any){
    let reviews = this.http.get('api/v1/reviews/' + email);
    return reviews;
  }

  getSpecificReview(email: string, title: string){
    let review = this.http.get('api/v1/user/'+email+'/review/'+title);
    return review;
  }

  gradeReview(feedback: string, grade: string, email: string, title: string ){
    let score = {
      'grade' : grade,
      'feedback' : feedback
    }

    let headers = { 'content-type' : 'application/json' };
    let graded = this.http.put('/api/v1/student/'+email+'/review/'+title, score, { 'headers': headers } ).subscribe( res => {
      //console.log(res);
    });
  }

  filterResults(email: string, category: string, query: string){
    let results = this.http.get('/api/v1/reviews/'+email+'/category/'+category+'/query/'+query);
    return results;
  }

  deleteRev(email: string, title:string){

    let deletedRev = this.http.delete('/api/v1/user/'+email+'/review/'+title).subscribe( res => {
      //console.log(res);
    });
    return deletedRev;
  }

  updateRev(email: string, title:string, rating:Number, review:string){
    console.log(email + ' ' + title + ' ' + rating + ' ' + review );
    let newRev = {
      'rating' : rating,
      'review' : review
    }

    let headers = { 'content-type' : 'application/json' };
    let updated = this.http.put('/api/v1/user/'+email+'/updateReview/'+title, newRev, { 'headers': headers } ).subscribe( res => {
      console.log(res);
      //window.location.href = 'student/'+email;
      this.router.navigate(['student/'+email]);
    });
  }

}
