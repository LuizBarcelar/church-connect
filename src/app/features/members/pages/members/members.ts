import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  ArrowLeft,
  ArrowRight,
  Cake,
  CalendarDays,
  Church,
  Droplets,
  Edit3,
  Eye,
  LocateFixed,
  LucideAngularModule,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-angular';

import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { MemberForm } from '../../components/member-form/member-form';

@Component({
  selector: 'app-members',
  imports: [
    FormsModule,
    DatePipe,
    MemberForm,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit {
  protected members: Member[] = [];

  protected searchTerm = '';

  protected showForm = false;
  protected selectedMember: Member | null = null;

  protected selectedBirthdayMonth = new Date().getMonth();
  protected selectedBirthdayYear = new Date().getFullYear();

  /* =========================
     ÍCONES
  ========================= */

  protected readonly Users = Users;
  protected readonly Droplets = Droplets;
  protected readonly Church = Church;
  protected readonly Plus = Plus;
  protected readonly Search = Search;
  protected readonly Cake = Cake;
  protected readonly CalendarDays = CalendarDays;
  protected readonly Sparkles = Sparkles;
  protected readonly MessageCircle = MessageCircle;
  protected readonly Eye = Eye;
  protected readonly Edit3 = Edit3;
  protected readonly Trash2 = Trash2;
  protected readonly ArrowLeft = ArrowLeft;
  protected readonly ArrowRight = ArrowRight;
  protected readonly LocateFixed = LocateFixed;

  constructor(
    private readonly memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  /* =========================
     MEMBROS
  ========================= */

  protected loadMembers(): void {
    this.members = this.memberService.getAll();
  }

  protected get totalMembers(): number {
    return this.members.length;
  }

  protected get baptizedMembersCount(): number {
    return this.members.filter(
      (member) => member.baptized,
    ).length;
  }

  protected get ministryMembersCount(): number {
    return this.members.filter(
      (member) => member.hasWorkedInMinistry,
    ).length;
  }

  protected get filteredMembers(): Member[] {
    const search = this.searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return this.members;
    }

    return this.members.filter((member) =>
      member.fullName
        .toLowerCase()
        .includes(search),
    );
  }

  /* =========================
     ANIVERSARIANTES
  ========================= */

  protected get birthdayMembers(): Member[] {
    return this.members
      .filter((member) => {
        const birthDate = this.getBirthDate(
          member.birthDate,
        );

        if (!birthDate) {
          return false;
        }

        return (
          birthDate.getMonth() ===
            this.selectedBirthdayMonth &&
          this.isValidBirthdayYear(birthDate)
        );
      })
      .sort((a, b) => {
        const dateA = this.getBirthDate(
          a.birthDate,
        );

        const dateB = this.getBirthDate(
          b.birthDate,
        );

        if (!dateA || !dateB) {
          return 0;
        }

        return dateA.getDate() - dateB.getDate();
      });
  }

  protected get birthdayTodayMembers(): Member[] {
    if (!this.isCurrentBirthdayMonth) {
      return [];
    }

    const today = new Date();

    return this.birthdayMembers.filter(
      (member) => {
        const birthDate = this.getBirthDate(
          member.birthDate,
        );

        if (!birthDate) {
          return false;
        }

        return (
          today.getDate() ===
            birthDate.getDate() &&
          today.getMonth() ===
            birthDate.getMonth()
        );
      },
    );
  }

  protected get birthdayCount(): number {
    return this.birthdayMembers.length;
  }

  protected get birthdayTodayCount(): number {
    return this.birthdayTodayMembers.length;
  }

  protected get birthdayMonthName(): string {
    const date = new Date(
      this.selectedBirthdayYear,
      this.selectedBirthdayMonth,
      1,
    );

    return new Intl.DateTimeFormat(
      'pt-BR',
      {
        month: 'long',
      },
    ).format(date);
  }

  protected get previousBirthdayMonthName(): string {
    const date = new Date(
      this.selectedBirthdayYear,
      this.selectedBirthdayMonth - 1,
      1,
    );

    return new Intl.DateTimeFormat(
      'pt-BR',
      {
        month: 'long',
      },
    ).format(date);
  }

  protected get nextBirthdayMonthName(): string {
    const date = new Date(
      this.selectedBirthdayYear,
      this.selectedBirthdayMonth + 1,
      1,
    );

    return new Intl.DateTimeFormat(
      'pt-BR',
      {
        month: 'long',
      },
    ).format(date);
  }

  protected previousBirthdayMonth(): void {
    if (this.selectedBirthdayMonth === 0) {
      this.selectedBirthdayMonth = 11;
      this.selectedBirthdayYear--;

      return;
    }

    this.selectedBirthdayMonth--;
  }

  protected nextBirthdayMonth(): void {
    if (this.selectedBirthdayMonth === 11) {
      this.selectedBirthdayMonth = 0;
      this.selectedBirthdayYear++;

      return;
    }

    this.selectedBirthdayMonth++;
  }

  protected goToCurrentBirthdayMonth(): void {
    const today = new Date();

    this.selectedBirthdayMonth =
      today.getMonth();

    this.selectedBirthdayYear =
      today.getFullYear();
  }

  protected get isCurrentBirthdayMonth(): boolean {
    const today = new Date();

    return (
      this.selectedBirthdayMonth ===
        today.getMonth() &&
      this.selectedBirthdayYear ===
        today.getFullYear()
    );
  }

  private isValidBirthdayYear(
    birthDate: Date,
  ): boolean {
    return birthDate.getFullYear() > 0;
  }

  /* =========================
     DATA DO ANIVERSÁRIO
  ========================= */

  protected getBirthdayDay(
    birthDate: string,
  ): string {
    const date = this.getBirthDate(
      birthDate,
    );

    if (!date) {
      return '--';
    }

    return String(
      date.getDate(),
    ).padStart(2, '0');
  }

  protected getBirthdayMonth(
    birthDate: string,
  ): string {
    const date = this.getBirthDate(
      birthDate,
    );

    if (!date) {
      return '';
    }

    return new Intl.DateTimeFormat(
      'pt-BR',
      {
        month: 'short',
      },
    )
      .format(date)
      .replace('.', '')
      .toUpperCase();
  }

  protected getBirthdayWeekday(
    birthDate: string,
  ): string {
    const date = this.getBirthDate(
      birthDate,
    );

    if (!date) {
      return '';
    }

    return new Intl.DateTimeFormat(
      'pt-BR',
      {
        weekday: 'long',
      },
    ).format(date);
  }

  protected isBirthdayToday(
    member: Member,
  ): boolean {
    if (!member.birthDate) {
      return false;
    }

    const today = new Date();

    const birthDate = this.getBirthDate(
      member.birthDate,
    );

    if (!birthDate) {
      return false;
    }

    return (
      today.getDate() ===
        birthDate.getDate() &&
      today.getMonth() ===
        birthDate.getMonth()
    );
  }

  /**
   * Converte YYYY-MM-DD em Date local.
   *
   * Evita o problema de uma data de nascimento
   * aparecer como o dia anterior por causa
   * da conversão automática para UTC.
   */
  private getBirthDate(
    birthDate: string,
  ): Date | null {
    if (!birthDate) {
      return null;
    }

    const parts = birthDate.split('-');

    if (parts.length !== 3) {
      return null;
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (!year || !month || !day) {
      return null;
    }

    return new Date(
      year,
      month - 1,
      day,
    );
  }

  /* =========================
     WHATSAPP
  ========================= */

  protected getWhatsAppLink(
    member: Member,
  ): string | null {
    if (
      !member.hasWhatsApp ||
      !member.phone
    ) {
      return null;
    }

    let phone = member.phone.replace(
      /\D/g,
      '',
    );

    /*
     * Remove o código do Brasil caso
     * já esteja cadastrado.
     */
    if (phone.startsWith('55')) {
      phone = phone.substring(2);
    }

    if (phone.length < 10) {
      return null;
    }

    const message =
      `Olá, ${member.fullName}! 🎉\n\n` +
      `Hoje é um dia muito especial! ` +
      `Desejamos a você um feliz aniversário, ` +
      `cheio de paz, alegria e muitas bênçãos de Deus. 🙏🎂\n\n` +
      `Que este novo ciclo seja marcado ` +
      `pela presença de Deus em sua vida ` +
      `e por muitas realizações.\n\n` +
      `Feliz aniversário! 🎉🙏`;

    return (
      `https://wa.me/55${phone}` +
      `?text=${encodeURIComponent(message)}`
    );
  }

  /* =========================
     INICIAIS
  ========================= */

  protected getInitials(
    fullName: string,
  ): string {
    const names = fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (names.length === 0) {
      return '?';
    }

    if (names.length === 1) {
      return names[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      names[0].charAt(0) +
      names[names.length - 1].charAt(0)
    ).toUpperCase();
  }

  /* =========================
     CRUD
  ========================= */

  protected createMember(): void {
    console.log('NOVO MEMBRO CLICADO');

    this.selectedMember = null;
    this.showForm = true;
    
    console.log('showForm:', this.showForm);
  }

  protected editMember(
    member: Member,
  ): void {
    this.selectedMember = member;
    this.showForm = true;
  }

  protected saveMember(
    member: Member,
  ): void {
    if (this.selectedMember) {
      this.members =
        this.memberService.update(member);
    } else {
      this.members =
        this.memberService.create(member);
    }

    this.closeForm();
  }

  protected deleteMember(
    id: number,
  ): void {
    const member = this.members.find(
      (item) => item.id === id,
    );

    if (!member) {
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir o membro "${member.fullName}"?`,
    );

    if (!confirmed) {
      return;
    }

    this.members =
      this.memberService.delete(id);
  }

  protected closeForm(): void {
    this.showForm = false;
    this.selectedMember = null;
  }
}
