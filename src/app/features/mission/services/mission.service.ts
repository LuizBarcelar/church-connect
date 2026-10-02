import { Injectable } from '@angular/core';

import {
  Mission,
  MissionActivity,
} from '../models/mission.model';

import { MISSIONS } from '../data/missions.data';

@Injectable({
  providedIn: 'root',
})
export class MissionService {

  private readonly storageKey = 'church_missions';


  getAll(): Mission[] {
    const storedMissions = this.getStoredMissions();

    if (storedMissions !== null) {
      return storedMissions;
    }

    const initialMissions = this.cloneMissions(MISSIONS);

    this.saveAll(initialMissions);

    return initialMissions;
  }


  getById(id: number): Mission | undefined {
    return this.getAll().find(
      (mission) => mission.id === id,
    );
  }


  saveAll(missions: Mission[]): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(missions),
      );
    } catch (error) {
      console.error(
        'Erro ao salvar obras missionárias:',
        error,
      );
    }
  }


  private getStoredMissions(): Mission[] | null {
    try {
      const storedData =
        localStorage.getItem(this.storageKey);

      if (!storedData) {
        return null;
      }

      const parsedData =
        JSON.parse(storedData) as Mission[];

      if (!Array.isArray(parsedData)) {
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error(
        'Erro ao carregar obras missionárias:',
        error,
      );

      return null;
    }
  }


  private cloneMissions(
    missions: Mission[],
  ): Mission[] {

    return missions.map(
      (mission) => ({
        ...mission,

        content: [
          ...mission.content,
        ],

        activities:
          this.cloneActivities(
            mission.activities,
          ),
      }),
    );
  }


  private cloneActivities(
    activities: MissionActivity[],
  ): MissionActivity[] {

    return activities.map(
      (activity) => ({
        ...activity,
      }),
    );
  }
}
