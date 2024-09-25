import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfoDaysComponent } from './wfo-days.component';

describe('WfoDaysComponent', () => {
  let component: WfoDaysComponent;
  let fixture: ComponentFixture<WfoDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WfoDaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WfoDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
