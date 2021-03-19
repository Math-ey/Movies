import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTextSearchComponent } from './full-text-search.component';

describe('FullTextSearchComponent', () => {
  let component: FullTextSearchComponent;
  let fixture: ComponentFixture<FullTextSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTextSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTextSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
