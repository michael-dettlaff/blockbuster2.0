import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { ReviewComponent } from './review/review.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { TeachReviewsComponent } from './teach-reviews/teach-reviews.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
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

const routes: Routes = [
  { path : '', component: LoginComponent},
  { path : 'login', component: LoginComponent },
  { path : 'teacher/:username', component: TeacherComponent},
  { path : 'teacher/:username/review', component: ReviewComponent},
  { path : 'teacher/:username/movieSearch', component: MovieComponent},
  { path : 'teacher/:username/addUser', component: AddStudentComponent},
  { path : 'teacher/:username/reviews', component: TeachReviewsComponent},
  //{ path : 'teacher/:username/watchlist', component : TeacherWatchlistComponent},
  { path : 'teacher/:username/update', component : TeacherUpdateComponent},
  { path : 'teacher/:username/reviews/:title', component: TeacherReviewViewComponent}, 
  { path : 'teacher/:username/student/:student', component: StudentDetailsComponent},
  { path : 'teacher/:username/student/:student/review/:title', component: ReviewDetailsComponent},
  { path : 'student/:username', component: StudentComponent },
  { path : 'student/:username/updateInfo', component: StudentUpdateInfoComponent},
  { path : 'student/:username/movieSearch', component: StudentMovieSearchComponent},
  { path : 'student/:username/makeReview', component: StudentMovieReviewComponent},
  { path : 'student/:username/review/:title', component: StudentReviewViewComponent},
  { path : 'student/:username/updateMovies', component: StudentUpdateMoviesComponent},
  { path : 'student/:username/updateMovie/:title', component: StudentUpdateSpecMovieComponent},
  //{ path : 'student/:username/watchList', component: StudentWatchlistComponent},
  { path : 'createAccount', component : CreateAccComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
