import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ObjectUnsubscribedError } from 'rxjs';
import { MovieService } from '../movie.service';
import { ReviewService } from '../review.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private movieService: MovieService, private reviewService: ReviewService, private router: Router) {}

  movies: any;
  teacher:any;
  student:any;
  title:string="";

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.searchMovie(f.value['title']);
  }

  async searchMovie(title: string){

    this.movieService.getMovie(title)
      .subscribe(movie => {

        if( Object.keys(movie).length < 4 ){
          //console.log('movie not in db');
          alert("This movie isn't in the database :( ");
        } else {
          this.movies = movie;
          let titleCopy = this.movies['Title'];
          this.title = titleCopy;
          titleCopy = titleCopy.replace(/ /g, '+');
          window.location.hash = titleCopy;
        }
      });
  }

  review(){
    let hash = window.location.hash;

    let user;
    let url = window.location.href.split('/');
    let role;

    for(let i = 0; i < url.length; i++){
      if(url[i] == 'teacher'){
        user = url[i+1];
        role = 'teacher';
        this.teacher = url[i+1];
      } else if (url[i] == 'student'){
        user = url[i+1];
        role = 'student';
        this.student = url[i+1];
      }
    };

    hash = hash.replace('#', '')

    // only allows a movie to be reviewed once
    let reviewedAlready = this.reviewService.getSpecificReview(this.teacher, this.title).subscribe( res => {
      if(Object.keys(res)[0] == 'reviewed'){
        console.log('not reviewed');
        // need to figure this out
        let url = '/teacher/' + this.teacher + '/review?title=' + hash;
        this.router.navigateByUrl(url);
        //window.location.href = '/teacher/' + this.teacher + '/review?title=' + hash;
      } else {
        //console.log('this user has already reviewed this movie');
        alert('You have already reviewed this movie!');
      }
    });
  }

}
