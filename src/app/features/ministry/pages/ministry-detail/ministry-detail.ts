import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Ministry } from '../../models/ministry.model';
import { MinistryService } from '../../services/ministry.service';

@Component({
  selector: 'app-ministry-detail',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './ministry-detail.html',
  styleUrl: './ministry-detail.css',
})
export class MinistryDetail {

  private readonly route = inject(ActivatedRoute);

  private readonly ministryService =
    inject(MinistryService);

  protected readonly ministryRoute =
    this.route.snapshot.paramMap.get('name');

  protected readonly ministry: Ministry | undefined =
    this.ministryRoute
      ? this.ministryService.getByName(this.ministryRoute)
      : undefined;
}
