import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListcomponent } from './movies-list.component';

describe('MoviesListPage', () => {
  let component: MoviesListcomponent;
  let fixture: ComponentFixture<MoviesListcomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListcomponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
