import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdateSpecMovieComponent } from './student-update-spec-movie.component';

describe('StudentUpdateSpecMovieComponent', () => {
  let component: StudentUpdateSpecMovieComponent;
  let fixture: ComponentFixture<StudentUpdateSpecMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentUpdateSpecMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUpdateSpecMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
