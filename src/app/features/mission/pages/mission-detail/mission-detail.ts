import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Mission } from '../../models/mission.model';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-mission-detail',
  imports: [RouterLink],
  templateUrl: './mission-detail.html',
  styleUrl: './mission-detail.css',
})
export class MissionDetail {

  private readonly route = inject(ActivatedRoute);
  private readonly missionService = inject(MissionService);

  protected readonly missionId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  protected readonly mission: Mission | undefined =
    this.missionService.getById(this.missionId);
}
