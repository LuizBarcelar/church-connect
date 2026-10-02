import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMission } from './world-mission';

describe('WorldMission', () => {
  let component: WorldMission;
  let fixture: ComponentFixture<WorldMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldMission],
    }).compileComponents();

    fixture = TestBed.createComponent(WorldMission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
