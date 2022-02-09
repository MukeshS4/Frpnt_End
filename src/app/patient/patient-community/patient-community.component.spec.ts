import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCommunityComponent } from './patient-community.component';

describe('PatientCommunityComponent', () => {
  let component: PatientCommunityComponent;
  let fixture: ComponentFixture<PatientCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
