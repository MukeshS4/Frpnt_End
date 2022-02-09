import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConsultComponent } from './patient-consult.component';

describe('PatientConsultComponent', () => {
  let component: PatientConsultComponent;
  let fixture: ComponentFixture<PatientConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
