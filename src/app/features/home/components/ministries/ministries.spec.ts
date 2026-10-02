import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ministries } from './ministries';

describe('Ministries', () => {
  let component: Ministries;
  let fixture: ComponentFixture<Ministries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ministries],
    }).compileComponents();

    fixture = TestBed.createComponent(Ministries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
