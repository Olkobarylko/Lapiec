import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaDateilComponent } from './pizza-dateil.component';

describe('PizzaDateilComponent', () => {
  let component: PizzaDateilComponent;
  let fixture: ComponentFixture<PizzaDateilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaDateilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaDateilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
