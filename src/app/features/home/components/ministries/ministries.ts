import { Component } from '@angular/core';

import { MinistryCard } from '../../../ministry/components/ministry-card/ministry-card';
import { MINISTRIES } from '../../../ministry/data/ministries.data';

@Component({
  selector: 'app-ministries',
  imports: [MinistryCard],
  templateUrl: './ministries.html',
  styleUrl: './ministries.css',
})
export class Ministries {
  protected readonly ministries = MINISTRIES;
}
