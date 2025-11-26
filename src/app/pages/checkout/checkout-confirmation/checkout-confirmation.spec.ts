import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutConfirmation } from './checkout-confirmation';

describe('CheckoutConfirmation', () => {
  let component: CheckoutConfirmation;
  let fixture: ComponentFixture<CheckoutConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutConfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
