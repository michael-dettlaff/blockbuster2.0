import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../movie.service';
import { ReviewService } from '../review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-movie-search',
  templateUrl: './student-movie-search.component.html',
  styleUrls: ['./student-movie-search.component.css']
})
export class StudentMovieSearchComponent implements OnInit {

  constructor(private movieService: MovieService, private reviewService: ReviewService, private router: Router) { }

  movies:any;
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
          console.log('movie not in db');
          alert("This movie isn't in the database :( ");
        } else {
          //console.log(movie);
          this.movies = movie;
          let titleCopy = this.movies['Title'];
          this.title = titleCopy;
          //console.log(titleCopy);
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
      if (url[i] == 'student'){
        user = url[i+1];
        role = 'student';
        this.student = url[i+1];
      }
    };
    hash = hash.replace('#', '')


    let reviewedAlready = this.reviewService.getSpecificReview(this.student, this.title).subscribe( res => {
      console.log(res);
      if(Object.keys(res)[0] == 'reviewed'){
        this.router.navigateByUrl('/student/' + this.student + '/makeReview?title=' + hash);
        //window.location.href = '/student/' + this.student + '/makeReview?title=' + hash;
      } else {
        alert('You have already reviewed this movie!');
      }
    });


  }

  addToList(){

    let hash = window.location.hash;

    let url = window.location.href.split('/');
    let role;

    for(let i = 0; i < url.length; i++){
      if (url[i] == 'student'){
        role = 'student';
        this.student = url[i+1];
      }
    };
    hash = hash.replace('#', '');
    hash = hash.replace('+', ' ');
    console.log('hash is ' + hash + ' student ' + this.student);
    console.log(this.movies.Poster);
    this.movieService.addToWatch(this.student, hash, this.movies.Poster);


  }

}
