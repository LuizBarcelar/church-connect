import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Mission } from '../models/mission.model';

@Component({
  selector: 'app-mission-card',
  imports: [RouterLink],
  templateUrl: './mission-card.html',
  styleUrl: './mission-card.css',
})
export class MissionCard {
  readonly mission = input.required<Mission>();
}
