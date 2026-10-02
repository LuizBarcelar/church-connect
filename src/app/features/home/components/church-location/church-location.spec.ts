import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchLocation } from './church-location';

describe('ChurchLocation', () => {
  let component: ChurchLocation;
  let fixture: ComponentFixture<ChurchLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurchLocation],
    }).compileComponents();

    fixture = TestBed.createComponent(ChurchLocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
