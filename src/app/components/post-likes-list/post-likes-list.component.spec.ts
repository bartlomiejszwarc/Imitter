import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikesListComponent } from './post-likes-list.component';

describe('PostLikesListComponent', () => {
  let component: PostLikesListComponent;
  let fixture: ComponentFixture<PostLikesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLikesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
