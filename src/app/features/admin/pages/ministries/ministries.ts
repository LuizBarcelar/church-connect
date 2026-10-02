import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Church,
  Edit3,
  Eye,
  Image,
  Layers3,
  LucideAngularModule,
  Plus,
  Search,
  Trash2,
  UsersRound,
} from 'lucide-angular';

import { Ministry } from '../../../ministry/models/ministry.model';
import { MinistryService } from '../../../ministry/services/ministry.service';
import { MinistryForm } from './components/ministry-form/ministry-form';

@Component({
  selector: 'app-admin-ministries',
  imports: [
    FormsModule,
    LucideAngularModule,
    MinistryForm,
  ],
  templateUrl: './ministries.html',
  styleUrl: './ministries.css',
})
export class Ministries implements OnInit {

  private readonly ministryService =
    inject(MinistryService);

  protected ministries: Ministry[] = [];

  protected searchTerm = '';

  protected readonly Church = Church;
  protected readonly UsersRound = UsersRound;
  protected readonly Layers3 = Layers3;
  protected readonly Plus = Plus;
  protected readonly Search = Search;
  protected readonly Eye = Eye;
  protected readonly Edit3 = Edit3;
  protected readonly Trash2 = Trash2;
  protected readonly Image = Image;
  protected showForm = false;

  protected selectedMinistry: Ministry | null = null;

  ngOnInit(): void {
    this.loadMinistries();
  }

  protected loadMinistries(): void {
    this.ministries =
      this.ministryService.getAll();
  }

  protected get totalMinistries(): number {
    return this.ministries.length;
  }

  protected get totalActivities(): number {
    return this.ministries.reduce(
      (total, ministry) =>
        total + ministry.activities.length,
      0
    );
  }

  protected get ministriesWithImage(): number {
    return this.ministries.filter(
      (ministry) =>
        Boolean(ministry.imageUrl?.trim())
    ).length;
  }

  protected get filteredMinistries(): Ministry[] {
    const search =
      this.searchTerm.trim().toLowerCase();

    if (!search) {
      return this.ministries;
    }

    return this.ministries.filter(
      (ministry) => {

        const searchableContent = [
          ministry.name,
          ministry.description,
          ministry.headline,
          ministry.route,
        ]
          .join(' ')
          .toLowerCase();

        return searchableContent.includes(search);
      }
    );
  }

  protected hasImage(
    ministry: Ministry
  ): boolean {

    return Boolean(
      ministry.imageUrl?.trim()
    );
  }

  protected getActivityLabel(
    ministry: Ministry
  ): string {

    const total =
      ministry.activities.length;

    return total === 1
      ? '1 atividade'
      : `${total} atividades`;
  }

  protected createMinistry(): void {
    this.selectedMinistry = null;
    this.showForm = true;
  }

  protected editMinistry(
    ministry: Ministry
  ): void {

  this.selectedMinistry = ministry;
  this.showForm = true;
  }

  protected deleteMinistry(
    ministry: Ministry
  ): void {

    const confirmed = window.confirm(
      `Deseja realmente excluir o ministério "${ministry.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.ministries =
      this.ministryService.delete(
        ministry.id
      );
  }

  protected saveMinistry(
    ministry: Ministry
  ): void {

    if (this.selectedMinistry) {
      this.ministries =
        this.ministryService.update(ministry);
    } else {
      this.ministries =
        this.ministryService.create(ministry);
    }

    this.closeForm();
  }

  protected closeForm(): void {
    this.showForm = false;
    this.selectedMinistry = null;
  }
}
