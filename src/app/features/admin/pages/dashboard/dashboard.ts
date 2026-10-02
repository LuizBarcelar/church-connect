import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  ArrowRight,
  Cake,
  Church,
  Droplets,
  Globe2,
  HandHeart,
  HeartHandshake,
  LucideAngularModule,
  MessageSquareQuote,
  Users,
} from 'lucide-angular';

import { MemberService } from '../../../members/services/member.service';
import { Member } from '../../../members/models/member.model';

import { TestimonialService } from '../../../../core/services/testimonial.service';

import { MISSIONS } from '../../../mission/data/missions.data';
import { MINISTRIES } from '../../../ministry/data/ministries.data';

import { PrayerService } from '../../../prayer/services/prayer.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DatePipe,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  protected members: Member[] = [];

  protected totalMembers = 0;
  protected baptizedMembers = 0;
  protected ministryMembers = 0;

  protected totalTestimonials = 0;
  protected totalMissions = MISSIONS.length;
  protected totalMinistries = MINISTRIES.length;

  protected totalPrayerRequests = 0;
  protected pendingPrayerRequests = 0;
  protected answeredPrayerRequests = 0;

  protected birthdayMembers: Member[] = [];

  protected readonly currentDate = new Date();

  /*
   * ÍCONES
   */
  protected readonly Users = Users;
  protected readonly Cake = Cake;
  protected readonly MessageSquareQuote = MessageSquareQuote;
  protected readonly Globe2 = Globe2;
  protected readonly HandHeart = HandHeart;
  protected readonly Droplets = Droplets;
  protected readonly Church = Church;
  protected readonly HeartHandshake = HeartHandshake;
  protected readonly ArrowRight = ArrowRight;

  constructor(
    private readonly memberService: MemberService,
    private readonly testimonialService: TestimonialService,
    private readonly prayerService: PrayerService,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  protected loadDashboard(): void {
    // =========================
    // MEMBROS
    // =========================

    this.members = this.memberService.getAll();

    this.totalMembers = this.members.length;

    this.baptizedMembers = this.members.filter(
      (member) => member.baptized,
    ).length;

    this.ministryMembers = this.members.filter(
      (member) => member.hasWorkedInMinistry,
    ).length;

    // =========================
    // CONTEÚDOS
    // =========================

    this.totalTestimonials =
      this.testimonialService.getAll().length;

    // =========================
    // ANIVERSARIANTES
    // =========================

    this.birthdayMembers = this.getBirthdayMembers();

    // =========================
    // PEDIDOS DE ORAÇÃO
    // =========================

    const prayerRequests = this.prayerService.getAll();

    this.totalPrayerRequests = prayerRequests.length;

    this.pendingPrayerRequests = prayerRequests.filter(
      (request) => request.status === 'pending',
    ).length;

    this.answeredPrayerRequests = prayerRequests.filter(
      (request) => request.status === 'answered',
    ).length;
  }

  protected getBirthdayMembers(): Member[] {
    const currentMonth = new Date().getMonth();

    return this.members
      .filter((member) => {
        const birthDate = this.getBirthDate(member.birthDate);

        if (!birthDate) {
          return false;
        }

        return birthDate.getMonth() === currentMonth;
      })
      .sort((a, b) => {
        const dateA = this.getBirthDate(a.birthDate);
        const dateB = this.getBirthDate(b.birthDate);

        if (!dateA || !dateB) {
          return 0;
        }

        return dateA.getDate() - dateB.getDate();
      });
  }

  protected isBirthdayToday(member: Member): boolean {
    const today = new Date();

    const birthDate = this.getBirthDate(member.birthDate);

    if (!birthDate) {
      return false;
    }

    return (
      today.getDate() === birthDate.getDate() &&
      today.getMonth() === birthDate.getMonth()
    );
  }

  protected get birthdayTodayCount(): number {
    return this.birthdayMembers.filter((member) =>
      this.isBirthdayToday(member),
    ).length;
  }

  protected get birthdayMonthName(): string {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
    }).format(new Date());
  }

  protected getBirthDate(
    birthDate: string,
  ): Date | null {
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

  protected getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase(),
      )
      .join('');
  }
}
