import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Activity,
  BookOpenText,
  Globe2,
  Image,
  LocateFixed,
  LucideAngularModule,
  MapPin,
  Plus,
  Save,
  Trash2,
  Type,
  X,
} from 'lucide-angular';

import {
  Mission,
  MissionActivity,
} from '../../../../../mission/models/mission.model';


@Component({
  selector: 'app-mission-form',

  imports: [
    FormsModule,
    LucideAngularModule,
  ],

  templateUrl: './mission-form.html',
  styleUrl: './mission-form.css',
})
export class MissionForm implements OnInit {

  /* =========================================================
     INPUT / OUTPUT
  ========================================================= */

  @Input()
  mission: Mission | null = null;

  @Output()
  save = new EventEmitter<Mission>();

  @Output()
  cancel = new EventEmitter<void>();


  /* =========================================================
     DADOS PRINCIPAIS
  ========================================================= */

  protected country = '';

  protected region = '';

  protected title = '';

  protected description = '';

  protected headline = '';

  protected imageUrl = '';


  /* =========================================================
     CONTEÚDO
  ========================================================= */

  protected content: string[] = [
    '',
  ];


  /* =========================================================
     ATIVIDADES
  ========================================================= */

  protected activities: MissionActivity[] = [];


  /* =========================================================
     ÍCONES
  ========================================================= */

  protected readonly Globe2 = Globe2;

  protected readonly MapPin = MapPin;

  protected readonly LocateFixed = LocateFixed;

  protected readonly Type = Type;

  protected readonly Image = Image;

  protected readonly BookOpenText = BookOpenText;

  protected readonly Activity = Activity;

  protected readonly Plus = Plus;

  protected readonly Trash2 = Trash2;

  protected readonly Save = Save;

  protected readonly X = X;


  /* =========================================================
     INICIALIZAÇÃO
  ========================================================= */

  ngOnInit(): void {

    if (!this.mission) {
      this.prepareNewMission();

      return;
    }

    this.loadMission(
      this.mission,
    );
  }


  /* =========================================================
     NOVA MISSÃO
  ========================================================= */

  private prepareNewMission(): void {

    this.country = '';

    this.region = '';

    this.title = '';

    this.description = '';

    this.headline = '';

    this.imageUrl = '';

    this.content = [
      '',
    ];

    this.activities = [];
  }


  /* =========================================================
     CARREGAR MISSÃO PARA EDIÇÃO
  ========================================================= */

  private loadMission(
    mission: Mission,
  ): void {

    this.country =
      mission.country ?? '';

    this.region =
      mission.region ?? '';

    this.title =
      mission.title ?? '';

    this.description =
      mission.description ?? '';

    this.headline =
      mission.headline ?? '';

    this.imageUrl =
      mission.imageUrl ?? '';


    this.content =
      mission.content?.length
        ? [...mission.content]
        : [''];


    this.activities =
      mission.activities?.map(
        (activity) => ({
          ...activity,
        }),
      ) ?? [];
  }


  /* =========================================================
     PARÁGRAFOS
  ========================================================= */

  protected addParagraph(): void {

    this.content = [
      ...this.content,
      '',
    ];
  }


  protected removeParagraph(
    index: number,
  ): void {

    if (this.content.length <= 1) {
      this.content = [''];

      return;
    }

    this.content =
      this.content.filter(
        (_, currentIndex) =>
          currentIndex !== index,
      );
  }


  protected updateParagraph(
    index: number,
    value: string,
  ): void {

    this.content[index] = value;
  }


  /* =========================================================
     ATIVIDADES
  ========================================================= */

  protected addActivity(): void {

    const newActivity: MissionActivity = {
      title: '',
      description: '',
      imageUrl: '',
    };

    this.activities = [
      ...this.activities,
      newActivity,
    ];
  }


  protected removeActivity(
    index: number,
  ): void {

    this.activities =
      this.activities.filter(
        (_, currentIndex) =>
          currentIndex !== index,
      );
  }


  /* =========================================================
     IMAGEM PRINCIPAL
  ========================================================= */

  protected hasImagePreview(): boolean {

    return Boolean(
      this.imageUrl.trim(),
    );
  }


  protected clearImage(): void {

    this.imageUrl = '';
  }


  /* =========================================================
     IMAGEM DA ATIVIDADE
  ========================================================= */

  protected hasActivityImage(
    activity: MissionActivity,
  ): boolean {

    return Boolean(
      activity.imageUrl?.trim(),
    );
  }


  protected clearActivityImage(
    index: number,
  ): void {

    if (!this.activities[index]) {
      return;
    }

    this.activities[index].imageUrl = '';
  }


  /* =========================================================
     VALIDAÇÃO
  ========================================================= */

  protected isFormValid(): boolean {

    return Boolean(
      this.country.trim() &&
      this.region.trim() &&
      this.title.trim() &&
      this.description.trim() &&
      this.headline.trim(),
    );
  }


  /* =========================================================
     SALVAR
  ========================================================= */

  protected submitForm(): void {

    if (!this.isFormValid()) {
      return;
    }


    const cleanContent = this.content
      .map(
        (paragraph) =>
          paragraph.trim(),
      )
      .filter(Boolean);


    const cleanActivities =
      this.activities
        .map(
          (activity) => ({
            title:
              activity.title.trim(),

            description:
              activity.description.trim(),

            imageUrl:
              activity.imageUrl?.trim() ||
              undefined,
          }),
        )
        .filter(
          (activity) =>
            activity.title &&
            activity.description,
        );


    const mission: Mission = {

      id:
        this.mission?.id ?? 0,

      country:
        this.country.trim(),

      region:
        this.region.trim(),

      title:
        this.title.trim(),

      description:
        this.description.trim(),

      headline:
        this.headline.trim(),

      content:
        cleanContent,

      imageUrl:
        this.imageUrl.trim() ||
        undefined,

      activities:
        cleanActivities,
    };


    this.save.emit(
      mission,
    );
  }


  /* =========================================================
     CANCELAR
  ========================================================= */

  protected cancelForm(): void {

    this.cancel.emit();
  }
}
