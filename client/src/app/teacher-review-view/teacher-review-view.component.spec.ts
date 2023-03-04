import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherReviewViewComponent } from './teacher-review-view.component';

describe('TeacherReviewViewComponent', () => {
  let component: TeacherReviewViewComponent;
  let fixture: ComponentFixture<TeacherReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherReviewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
