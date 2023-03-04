import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachReviewsComponent } from './teach-reviews.component';

describe('TeachReviewsComponent', () => {
  let component: TeachReviewsComponent;
  let fixture: ComponentFixture<TeachReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
