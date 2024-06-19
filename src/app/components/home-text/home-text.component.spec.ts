import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTextComponent } from './home-text.component';

describe('HomeTextComponent', () => {
  let component: HomeTextComponent;
  let fixture: ComponentFixture<HomeTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTextComponent]
    });
    fixture = TestBed.createComponent(HomeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
