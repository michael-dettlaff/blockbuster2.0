import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMovieSearchComponent } from './student-movie-search.component';

describe('StudentMovieSearchComponent', () => {
  let component: StudentMovieSearchComponent;
  let fixture: ComponentFixture<StudentMovieSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMovieSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
