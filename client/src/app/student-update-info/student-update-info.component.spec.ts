import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdateInfoComponent } from './student-update-info.component';

describe('StudentUpdateInfoComponent', () => {
  let component: StudentUpdateInfoComponent;
  let fixture: ComponentFixture<StudentUpdateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentUpdateInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUpdateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
