import { Component, OnInit } from '@angular/core';

import { MissionCard } from '../../components/mission-card';
import { Mission } from '../../models/mission.model';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-missions',
  imports: [MissionCard],
  templateUrl: './missions.html',
  styleUrl: './missions.css',
})
export class Missions implements OnInit {

  protected missions: Mission[] = [];

  constructor(
    private readonly missionService: MissionService,
  ) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  private loadMissions(): void {
    this.missions = this.missionService.getAll();
  }
}
