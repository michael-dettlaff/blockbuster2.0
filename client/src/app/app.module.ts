import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CSRFInterceptor } from './interceptors/csrfinterceptor';

import { LoginComponent } from './login/login.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ReviewComponent } from './review/review.component';
import { MovieComponent } from './movie/movie.component';

import { MovieService } from './movie.service';
import { TeacherService } from './teacher.service';
import { ReviewService } from './review.service';
import { LoginService } from './login.service'
import { StudentService } from './student.service';

import { TeachHeaderComponent } from './teach-header/teach-header.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentComponent } from './student/student.component';
import { TeachReviewsComponent } from './teach-reviews/teach-reviews.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { CreateAccComponent } from './create-acc/create-acc.component';
import { StudentReviewViewComponent } from './student-review-view/student-review-view.component';
import { TeacherReviewViewComponent } from './teacher-review-view/teacher-review-view.component';
import { StudentMovieSearchComponent } from './student-movie-search/student-movie-search.component';
import { StudentMovieReviewComponent } from './student-movie-review/student-movie-review.component';
import { StudentUpdateInfoComponent } from './student-update-info/student-update-info.component';
import { StudentUpdateMoviesComponent } from './student-update-movies/student-update-movies.component';
import { StudentUpdateSpecMovieComponent } from './student-update-spec-movie/student-update-spec-movie.component';
//import { StudentWatchlistComponent } from './student-watchlist/student-watchlist.component';
//import { TeacherWatchlistComponent } from './teacher-watchlist/teacher-watchlist.component';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeacherComponent,
    ReviewComponent,
    MovieComponent,
    TeachHeaderComponent,
    AddStudentComponent,
    StudentComponent,
    TeachReviewsComponent,
    StudentDetailsComponent,
    ReviewDetailsComponent,
    StudentHeaderComponent,
    CreateAccComponent,
    StudentReviewViewComponent,
    TeacherReviewViewComponent,
    StudentMovieSearchComponent,
    StudentMovieReviewComponent,
    StudentUpdateInfoComponent,
    StudentUpdateMoviesComponent,
    StudentUpdateSpecMovieComponent,
    //StudentWatchlistComponent,
    //TeacherWatchlistComponent,
    TeacherUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'X-XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
  ],
  providers: [
    MovieService,
    TeacherService,
    ReviewService,
    LoginService, 
    StudentService,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: CSRFInterceptor,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
