import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReviewViewComponent } from './student-review-view.component';

describe('StudentReviewViewComponent', () => {
  let component: StudentReviewViewComponent;
  let fixture: ComponentFixture<StudentReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentReviewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
