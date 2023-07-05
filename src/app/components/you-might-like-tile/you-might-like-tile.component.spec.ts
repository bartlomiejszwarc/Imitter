import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouMightLikeTileComponent } from './you-might-like-tile.component';

describe('YouMightLikeTileComponent', () => {
  let component: YouMightLikeTileComponent;
  let fixture: ComponentFixture<YouMightLikeTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouMightLikeTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouMightLikeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
