import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMovieReviewComponent } from './student-movie-review.component';

describe('StudentMovieReviewComponent', () => {
  let component: StudentMovieReviewComponent;
  let fixture: ComponentFixture<StudentMovieReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMovieReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
