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
  Image,
  Layers3,
  Link2,
  LucideAngularModule,
  Plus,
  Save,
  Trash2,
  Type,
  UsersRound,
  X,
} from 'lucide-angular';

import { Ministry } from '../../../../../ministry/models/ministry.model';
import { MinistryActivity } from '../../../../../ministry/models/ministry-activity.model';

@Component({
  selector: 'app-ministry-form',
  imports: [
    FormsModule,
    LucideAngularModule,
  ],
  templateUrl: './ministry-form.html',
  styleUrl: './ministry-form.css',
})
export class MinistryForm implements OnInit {

  @Input()
  ministry: Ministry | null = null;

  @Output()
  save = new EventEmitter<Ministry>();

  @Output()
  cancel = new EventEmitter<void>();

  protected name = '';
  protected description = '';
  protected imageUrl = '';
  protected route = '';
  protected headline = '';

  protected content: string[] = [''];

  protected activities: MinistryActivity[] = [];

  protected readonly UsersRound = UsersRound;
  protected readonly Type = Type;
  protected readonly Image = Image;
  protected readonly Link2 = Link2;
  protected readonly BookOpenText = BookOpenText;
  protected readonly Activity = Activity;
  protected readonly Layers3 = Layers3;
  protected readonly Plus = Plus;
  protected readonly Trash2 = Trash2;
  protected readonly Save = Save;
  protected readonly X = X;

  ngOnInit(): void {
    if (this.ministry) {
      this.loadMinistry(this.ministry);
      return;
    }

    this.prepareNewMinistry();
  }

  private prepareNewMinistry(): void {
    this.name = '';
    this.description = '';
    this.imageUrl = '';
    this.route = '';
    this.headline = '';

    this.content = [''];
    this.activities = [];
  }

  private loadMinistry(
    ministry: Ministry
  ): void {

    this.name = ministry.name;
    this.description = ministry.description;
    this.imageUrl = ministry.imageUrl ?? '';
    this.route = ministry.route;
    this.headline = ministry.headline;

    this.content = ministry.content.length
      ? [...ministry.content]
      : [''];

    this.activities = ministry.activities.map(
      (activity) => ({
        ...activity,
      })
    );
  }

  protected addParagraph(): void {
    this.content.push('');
  }

  protected removeParagraph(
    index: number
  ): void {

    if (this.content.length === 1) {
      this.content[0] = '';
      return;
    }

    this.content.splice(index, 1);
  }

  protected updateParagraph(
    index: number,
    value: string
  ): void {

    this.content[index] = value;
  }

  protected addActivity(): void {
    this.activities.push({
      title: '',
      description: '',
      imageUrl: '',
    });
  }

  protected removeActivity(
    index: number
  ): void {

    this.activities.splice(index, 1);
  }

  protected hasImagePreview(): boolean {
    return Boolean(
      this.imageUrl.trim()
    );
  }

  protected clearImage(): void {
    this.imageUrl = '';
  }

  protected hasActivityImage(
    activity: MinistryActivity
  ): boolean {

    return Boolean(
      activity.imageUrl.trim()
    );
  }

  protected clearActivityImage(
    activity: MinistryActivity
  ): void {

    activity.imageUrl = '';
  }

  protected onNameChange(): void {
    if (this.ministry) {
      return;
    }

    this.route =
      `/ministerio/${this.createSlug(this.name)}`;
  }

  private createSlug(
    value: string
  ): string {

    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  protected get isFormValid(): boolean {
    return Boolean(
      this.name.trim() &&
      this.description.trim() &&
      this.headline.trim()
    );
  }

  protected submitForm(): void {
    if (!this.isFormValid) {
      return;
    }

    const cleanContent = this.content
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const cleanActivities =
      this.activities
        .map((activity) => ({
          title: activity.title.trim(),
          description:
            activity.description.trim(),
          imageUrl:
            activity.imageUrl.trim(),
        }))
        .filter(
          (activity) =>
            activity.title &&
            activity.description
        );

    const ministry: Ministry = {
      id: this.ministry?.id ?? 0,

      name: this.name.trim(),

      description:
        this.description.trim(),

      imageUrl:
        this.imageUrl.trim() ||
        undefined,

      route:
        this.route.trim(),

      headline:
        this.headline.trim(),

      content: cleanContent,

      activities: cleanActivities,
    };

    this.save.emit(ministry);
  }

  protected cancelForm(): void {
    this.cancel.emit();
  }
}
