import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Church,
  Edit3,
  Eye,
  Globe2,
  Image,
  LucideAngularModule,
  MapPin,
  Plus,
  Search,
  Trash2,
} from 'lucide-angular';

import { Mission } from '../../../mission/models/mission.model';
import { AdminMissionService } from './services/admin-mission.service';
import { MissionForm } from './components/mission-form/mission-form';


@Component({
  selector: 'app-admin-missions',

  imports: [
    FormsModule,
    LucideAngularModule,
    MissionForm,
  ],

  templateUrl: './missions.html',
  styleUrl: './missions.css',
})
export class Missions implements OnInit {

  /* =========================================================
     DADOS
  ========================================================= */

  protected missions: Mission[] = [];

  protected searchTerm = '';

  protected showForm = false;

  protected selectedMission: Mission | null = null;


  /* =========================================================
     ÍCONES
  ========================================================= */

  protected readonly Globe2 = Globe2;
  protected readonly MapPin = MapPin;
  protected readonly Church = Church;
  protected readonly Plus = Plus;
  protected readonly Search = Search;
  protected readonly Eye = Eye;
  protected readonly Edit3 = Edit3;
  protected readonly Trash2 = Trash2;
  protected readonly Image = Image;


  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(
    private readonly adminMissionService: AdminMissionService,
  ) {}


  /* =========================================================
     INICIALIZAÇÃO
  ========================================================= */

  ngOnInit(): void {
    this.loadMissions();
  }


  /* =========================================================
     CARREGAR MISSÕES
  ========================================================= */

  protected loadMissions(): void {
    this.missions =
      this.adminMissionService.getAll();
  }


  /* =========================================================
     ESTATÍSTICAS
  ========================================================= */

  protected get totalMissions(): number {
    return this.missions.length;
  }


  protected get totalActivities(): number {
    return this.missions.reduce(
      (total, mission) =>
        total + mission.activities.length,
      0,
    );
  }


  protected get totalRegions(): number {
    const regions = this.missions
      .map((mission) =>
        mission.region.trim(),
      )
      .filter(Boolean);

    return new Set(regions).size;
  }


  /* =========================================================
     PESQUISA
  ========================================================= */

  protected get filteredMissions(): Mission[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return this.missions;
    }

    return this.missions.filter(
      (mission) => {

        const searchableContent = [
          mission.country,
          mission.region,
          mission.title,
          mission.description,
          mission.headline,
        ]
          .join(' ')
          .toLowerCase();

        return searchableContent.includes(
          search,
        );
      },
    );
  }


  /* =========================================================
     NOVA MISSÃO
  ========================================================= */

  protected createMission(): void {

    this.selectedMission = null;

    this.showForm = true;
  }


  /* =========================================================
     EDITAR
  ========================================================= */

  protected editMission(mission: Mission): void {
    this.selectedMission = mission;
    this.showForm = true;
  }


  /* =========================================================
     SALVAR
  ========================================================= */

  protected saveMission(mission: Mission): void {
    if (this.selectedMission) {
      this.missions =
        this.adminMissionService.update(mission);
    } else {
      this.missions =
        this.adminMissionService.create(mission);
    }

    this.closeForm();
  }


  /* =========================================================
     EXCLUIR
  ========================================================= */

  protected deleteMission(
    mission: Mission,
  ): void {

    const confirmed = window.confirm(
      `Deseja realmente excluir a obra missionária "${mission.country}"?`,
    );

    if (!confirmed) {
      return;
    }

    this.missions =
      this.adminMissionService.delete(
        mission.id,
      );
  }


  /* =========================================================
     FECHAR FORMULÁRIO
  ========================================================= */

  protected closeForm(): void {
    this.showForm = false;
    this.selectedMission = null;
  }


  /* =========================================================
     IMAGEM
  ========================================================= */

  protected hasMissionImage(
    mission: Mission,
  ): boolean {

    return Boolean(
      mission.imageUrl?.trim(),
    );
  }


  /* =========================================================
     TOTAL DE ATIVIDADES DA MISSÃO
  ========================================================= */

  protected getActivityCount(
    mission: Mission,
  ): number {

    return mission.activities.length;
  }


  /* =========================================================
     TEXTO DE ATIVIDADES
  ========================================================= */

  protected getActivityLabel(
    mission: Mission,
  ): string {

    const total =
      this.getActivityCount(mission);

    return total === 1
      ? '1 atividade'
      : `${total} atividades`;
  }


  /* =========================================================
     PREVIEW DO CONTEÚDO
  ========================================================= */

  protected getContentPreview(
    mission: Mission,
  ): string {

    if (
      !mission.content ||
      mission.content.length === 0
    ) {
      return mission.description;
    }

    return mission.content[0];
  }
}
