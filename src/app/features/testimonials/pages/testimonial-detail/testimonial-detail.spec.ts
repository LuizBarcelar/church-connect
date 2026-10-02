import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialDetail } from './testimonial-detail';

describe('TestimonialDetail', () => {
  let component: TestimonialDetail;
  let fixture: ComponentFixture<TestimonialDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
