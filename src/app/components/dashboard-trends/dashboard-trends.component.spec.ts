import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrendsComponent } from './dashboard-trends.component';

describe('DashboardTrendsComponent', () => {
  let component: DashboardTrendsComponent;
  let fixture: ComponentFixture<DashboardTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTrendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
