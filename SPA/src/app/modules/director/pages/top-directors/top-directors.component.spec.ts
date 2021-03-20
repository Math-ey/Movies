import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDirectorsComponent } from './top-directors.component';

describe('TopDirectorsComponent', () => {
  let component: TopDirectorsComponent;
  let fixture: ComponentFixture<TopDirectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDirectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
