import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Ministry } from '../../models/ministry.model';

@Component({
  selector: 'app-ministry-card',
  imports: [RouterLink],
  templateUrl: './ministry-card.html',
  styleUrl: './ministry-card.css',
})
export class MinistryCard {
  readonly ministry = input.required<Ministry>();
}
