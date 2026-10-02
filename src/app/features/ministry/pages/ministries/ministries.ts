import { Component, OnInit, inject } from '@angular/core';

import { MinistryCard } from '../../components/ministry-card/ministry-card';
import { Ministry } from '../../models/ministry.model';
import { MinistryService } from '../../services/ministry.service';

@Component({
  selector: 'app-ministries',
  imports: [MinistryCard],
  templateUrl: './ministries.html',
  styleUrl: './ministries.css',
})
export class Ministries implements OnInit {

  private readonly ministryService = inject(MinistryService);

  protected ministries: Ministry[] = [];

  ngOnInit(): void {
    this.ministries = this.ministryService.getAll();
  }
}
