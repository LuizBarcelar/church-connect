import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import {
  ArrowLeft,
  Cake,
  CalendarDays,
  Check,
  Church,
  Droplets,
  Edit3,
  HeartHandshake,
  LocateFixed,
  LucideAngularModule,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
} from 'lucide-angular';

import { MemberService } from '../../services/member.service';
import {
  Member,
  MinistryRole,
} from '../../models/member.model';
import { MemberForm } from '../../components/member-form/member-form';

@Component({
  selector: 'app-member-detail',
  imports: [
    DatePipe,
    RouterLink,
    MemberForm,
    LucideAngularModule,
  ],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail implements OnInit {
  protected member: Member | undefined;
  protected editing = false;

  /* =========================
     ÍCONES
  ========================= */

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly Cake = Cake;
  protected readonly CalendarDays = CalendarDays;
  protected readonly Check = Check;
  protected readonly Church = Church;
  protected readonly Droplets = Droplets;
  protected readonly Edit3 = Edit3;
  protected readonly HeartHandshake = HeartHandshake;
  protected readonly LocateFixed = LocateFixed;
  protected readonly Mail = Mail;
  protected readonly MapPin = MapPin;
  protected readonly MessageCircle = MessageCircle;
  protected readonly Phone = Phone;
  protected readonly UserRound = UserRound;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly memberService: MemberService,
  ) {}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id'),
    );

    this.member =
      this.memberService.getById(id);

    if (!this.member) {
      this.router.navigate([
        '/admin/membros',
      ]);
    }
  }

  /* =========================
     PERFIL
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
     MINISTÉRIOS
  ========================= */

  protected getMinistryRoleLabel(
    role: MinistryRole,
  ): string {
    const roles: Record<
      MinistryRole,
      string
    > = {
      obreiro: 'Obreiro',
      auxiliar: 'Auxiliar',
      pastor: 'Pastor',
      louvor: 'Louvor',
      'minist-infantil':
        'Ministério Infantil',
      'minist-jovens':
        'Ministério de Jovens',
      'minist-homens':
        'Ministério de Homens',
      'minist-mulheres':
        'Ministério de Mulheres',
      'minist-intercessao':
        'Ministério de Intercessão',
      'minist-evangelismo':
        'Ministério de Evangelismo',
    };

    return roles[role];
  }

  /* =========================
     ANIVERSÁRIO
  ========================= */

  protected isBirthdayToday(): boolean {
    if (!this.member?.birthDate) {
      return false;
    }

    const today = new Date();

    const birthDate =
      this.getBirthDate(
        this.member.birthDate,
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

  protected getWhatsAppLink(): string | null {
    if (
      !this.member?.hasWhatsApp ||
      !this.member.phone
    ) {
      return null;
    }

    let phone = this.member.phone.replace(
      /\D/g,
      '',
    );

    /*
     * Evita duplicar o código 55
     * caso ele já esteja salvo.
     */
    if (phone.startsWith('55')) {
      phone = phone.substring(2);
    }

    if (phone.length < 10) {
      return null;
    }

    const message =
      this.getBirthdayMessage();

    return (
      `https://wa.me/55${phone}` +
      `?text=${encodeURIComponent(message)}`
    );
  }

  protected getBirthdayMessage(): string {
    const name =
      this.member?.fullName ?? '';

    return (
      `Olá, ${name}! 🎉\n\n` +
      `Hoje é um dia muito especial! ` +
      `Desejamos a você um feliz aniversário, ` +
      `cheio de paz, alegria e muitas bênçãos de Deus. 🙏🎂\n\n` +
      `Que este novo ciclo seja marcado ` +
      `pela presença de Deus em sua vida ` +
      `e por muitas realizações.\n\n` +
      `Feliz aniversário! 🎉🙏`
    );
  }

  /* =========================
     ENDEREÇO
  ========================= */

  protected getAddress(): string {
    if (!this.member) {
      return '';
    }

    const parts = [
      this.member.neighborhood,
      this.member.block
        ? `Quadra ${this.member.block}`
        : '',
      this.member.set
        ? `Conjunto ${this.member.set}`
        : '',
      this.member.house
        ? `Casa ${this.member.house}`
        : '',
    ].filter(Boolean);

    return parts.join(' • ');
  }

  /* =========================
     DATA
  ========================= */

  private getBirthDate(
    birthDate: string,
  ): Date | null {
    const parts =
      birthDate.split('-');

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
     EDIÇÃO
  ========================= */

  protected startEditing(): void {
    this.editing = true;
  }

  protected cancelEditing(): void {
    this.editing = false;
  }

  protected saveMember(
    member: Member,
  ): void {
    this.memberService.update(member);

    this.member = member;
    this.editing = false;
  }
}
