import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdateMoviesComponent } from './student-update-movies.component';

describe('StudentUpdateMoviesComponent', () => {
  let component: StudentUpdateMoviesComponent;
  let fixture: ComponentFixture<StudentUpdateMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentUpdateMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUpdateMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
