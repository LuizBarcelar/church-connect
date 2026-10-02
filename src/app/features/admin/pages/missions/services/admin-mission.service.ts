import { Injectable } from '@angular/core';

import {
  Mission,
  MissionActivity,
} from '../../../../mission/models/mission.model';

import {
  MISSIONS,
} from '../../../../mission/data/missions.data';


@Injectable({
  providedIn: 'root',
})
export class AdminMissionService {

  private readonly storageKey = 'church_missions';


  /* =========================================================
     LISTAR
  ========================================================= */

  getAll(): Mission[] {
    const storedMissions = this.getStoredMissions();

    if (storedMissions) {
      return storedMissions;
    }

    const initialMissions = this.cloneMissions(MISSIONS);

    this.saveToStorage(initialMissions);

    return initialMissions;
  }


  /* =========================================================
     BUSCAR POR ID
  ========================================================= */

  getById(id: number): Mission | undefined {
    return this.getAll().find(
      (mission) => mission.id === id,
    );
  }


  /* =========================================================
     CRIAR
  ========================================================= */

  create(mission: Mission): Mission[] {
    const missions = this.getAll();

    const newMission: Mission = {
      ...mission,

      id: this.generateId(missions),

      content: [...mission.content],

      activities: this.cloneActivities(
        mission.activities,
      ),
    };

    const updatedMissions = [
      ...missions,
      newMission,
    ];

    this.saveToStorage(updatedMissions);

    return updatedMissions;
  }


  /* =========================================================
     ATUALIZAR
  ========================================================= */

  update(mission: Mission): Mission[] {
    const missions = this.getAll();

    const updatedMissions = missions.map(
      (currentMission) => {

        if (currentMission.id !== mission.id) {
          return currentMission;
        }

        return {
          ...mission,

          content: [...mission.content],

          activities: this.cloneActivities(
            mission.activities,
          ),
        };
      },
    );

    this.saveToStorage(updatedMissions);

    return updatedMissions;
  }


  /* =========================================================
     EXCLUIR
  ========================================================= */

  delete(id: number): Mission[] {
    const missions = this.getAll();

    const updatedMissions = missions.filter(
      (mission) => mission.id !== id,
    );

    this.saveToStorage(updatedMissions);

    return updatedMissions;
  }


  /* =========================================================
     TOTAL DE MISSÕES
  ========================================================= */

  getTotalMissions(): number {
    return this.getAll().length;
  }


  /* =========================================================
     TOTAL DE ATIVIDADES
  ========================================================= */

  getTotalActivities(): number {
    return this.getAll().reduce(
      (total, mission) =>
        total + mission.activities.length,
      0,
    );
  }


  /* =========================================================
     TOTAL DE REGIÕES
  ========================================================= */

  getTotalRegions(): number {
    const regions = this.getAll()
      .map((mission) => mission.region.trim())
      .filter(Boolean);

    return new Set(regions).size;
  }


  /* =========================================================
     LOCAL STORAGE
  ========================================================= */

  private getStoredMissions(): Mission[] | null {
    try {
      const storedData = localStorage.getItem(
        this.storageKey,
      );

      if (!storedData) {
        return null;
      }

      const parsedData = JSON.parse(
        storedData,
      ) as Mission[];

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


  private saveToStorage(
    missions: Mission[],
  ): void {

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


  /* =========================================================
     GERAR ID
  ========================================================= */

  private generateId(
    missions: Mission[],
  ): number {

    if (missions.length === 0) {
      return 1;
    }

    const highestId = Math.max(
      ...missions.map(
        (mission) => mission.id,
      ),
    );

    return highestId + 1;
  }


  /* =========================================================
     CLONAGEM
  ========================================================= */

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
