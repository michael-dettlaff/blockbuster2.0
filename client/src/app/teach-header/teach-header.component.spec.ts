import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachHeaderComponent } from './teach-header.component';

describe('TeachHeaderComponent', () => {
  let component: TeachHeaderComponent;
  let fixture: ComponentFixture<TeachHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
