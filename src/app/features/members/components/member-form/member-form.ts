import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Cake,
  Camera,
  Check,
  ChevronDown,
  Church,
  CircleUserRound,
  Droplets,
  HeartHandshake,
  Image,
  LocateFixed,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  Save,
  Search,
  UserRound,
  X,
} from 'lucide-angular';

import {
  Member,
  MinistryRole,
} from '../../models/member.model';

import {
  BRAZIL_STATES,
  StateOption,
} from '../../data/brazil-locations.data';

@Component({
  selector: 'app-member-form',
  imports: [
    FormsModule,
    LucideAngularModule,
  ],
  templateUrl: './member-form.html',
  styleUrl: './member-form.css',
})
export class MemberForm implements OnInit {

  @Input()
  member: Member | null = null;

  @Output()
  save = new EventEmitter<Member>();

  @Output()
  cancel = new EventEmitter<void>();


  /* =====================================================
     ÍCONES
  ===================================================== */

  protected readonly Cake = Cake;
  protected readonly Camera = Camera;
  protected readonly Check = Check;
  protected readonly ChevronDown = ChevronDown;
  protected readonly Church = Church;
  protected readonly CircleUserRound = CircleUserRound;
  protected readonly Droplets = Droplets;
  protected readonly HeartHandshake = HeartHandshake;
  protected readonly Image = Image;
  protected readonly LocateFixed = LocateFixed;
  protected readonly Mail = Mail;
  protected readonly MapPin = MapPin;
  protected readonly Phone = Phone;
  protected readonly Save = Save;
  protected readonly Search = Search;
  protected readonly UserRound = UserRound;
  protected readonly X = X;


  /* =====================================================
     DADOS PESSOAIS
  ===================================================== */

  protected fullName = '';
  protected birthDate = '';
  protected photoUrl = '';


  /* =====================================================
     CONTATO
  ===================================================== */

  protected phone = '';
  protected hasWhatsApp = false;
  protected email = '';


  /* =====================================================
     ENDEREÇO
  ===================================================== */

  protected state = '';

  protected readonly states =
    BRAZIL_STATES;

  protected selectedState:
    StateOption | undefined;

  protected cities: string[] = [];

  protected city = '';
  protected cep = '';
  protected neighborhood = '';
  protected block = '';
  protected set = '';
  protected house = '';

  protected loadingCep = false;
  protected cepError = '';


  /* =====================================================
     VIDA CRISTÃ
  ===================================================== */

  protected baptized = false;
  protected baptismDate = '';
  protected baptismPlace = '';

  protected baptizedInHolySpirit =
    false;


  /* =====================================================
     ATUAÇÃO NA OBRA
  ===================================================== */

  protected hasWorkedInMinistry =
    false;

  protected ministryRoles:
    MinistryRole[] = [];

  protected readonly availableMinistryRoles: {
    value: MinistryRole;
    label: string;
  }[] = [
    {
      value: 'obreiro',
      label: 'Obreiro',
    },
    {
      value: 'auxiliar',
      label: 'Auxiliar',
    },
    {
      value: 'pastor',
      label: 'Pastor',
    },
    {
      value: 'louvor',
      label: 'Louvor',
    },
    {
      value: 'minist-infantil',
      label: 'Ministério Infantil',
    },
    {
      value: 'minist-jovens',
      label: 'Ministério de Jovens',
    },
    {
      value: 'minist-homens',
      label: 'Ministério de Homens',
    },
    {
      value: 'minist-mulheres',
      label: 'Ministério de Mulheres',
    },
    {
      value: 'minist-intercessao',
      label: 'Ministério de Intercessão',
    },
    {
      value: 'minist-evangelismo',
      label: 'Ministério de Evangelismo',
    },
  ];


  /* =====================================================
     INICIALIZAÇÃO
  ===================================================== */

  ngOnInit(): void {
    if (!this.member) {
      return;
    }

    // Dados pessoais
    this.fullName =
      this.member.fullName;

    this.birthDate =
      this.member.birthDate;

    this.photoUrl =
      this.member.photoUrl ?? '';

    // Contato
    this.phone =
      this.member.phone ?? '';

    this.hasWhatsApp =
      this.member.hasWhatsApp ?? false;

    this.email =
      this.member.email ?? '';

    // Endereço
    this.state =
      this.member.state ?? '';

    this.onStateChange(false);

    this.city =
      this.member.city ?? '';

    this.cep =
      this.member.cep ?? '';

    this.neighborhood =
      this.member.neighborhood ?? '';

    this.block =
      this.member.block ?? '';

    this.set =
      this.member.set ?? '';

    this.house =
      this.member.house ?? '';

    // Vida cristã
    this.baptized =
      this.member.baptized;

    this.baptismDate =
      this.member.baptismDate ?? '';

    this.baptismPlace =
      this.member.baptismPlace ?? '';

    this.baptizedInHolySpirit =
      this.member.baptizedInHolySpirit;

    // Atuação na obra
    this.hasWorkedInMinistry =
      this.member.hasWorkedInMinistry;

    this.ministryRoles = [
      ...(this.member.ministryRoles ?? []),
    ];
  }


  /* =====================================================
     FOTO
  ===================================================== */

  protected hasPhotoPreview(): boolean {
    return Boolean(
      this.photoUrl.trim(),
    );
  }

  protected clearPhoto(): void {
    this.photoUrl = '';
  }

  protected getPhotoInitials(): string {
    const names = this.fullName
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


  /* =====================================================
     TELEFONE
  ===================================================== */

  protected formatPhone(): void {
    let numbers =
      this.phone.replace(
        /\D/g,
        '',
      );

    /*
     * Remove o código do Brasil
     * caso o usuário digite 55.
     */
    if (numbers.startsWith('55')) {
      numbers =
        numbers.substring(2);
    }

    numbers =
      numbers.slice(0, 11);

    if (numbers.length <= 10) {

      if (numbers.length > 6) {

        this.phone =
          `(${numbers.slice(0, 2)}) ` +
          `${numbers.slice(2, 6)}-${numbers.slice(6)}`;

      } else if (
        numbers.length > 2
      ) {

        this.phone =
          `(${numbers.slice(0, 2)}) ` +
          numbers.slice(2);

      } else {

        this.phone = numbers;

      }

      return;
    }

    this.phone =
      `(${numbers.slice(0, 2)}) ` +
      `${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }


  /* =====================================================
     ESTADO → CIDADE
  ===================================================== */

  protected onStateChange(
    clearCity = true,
  ): void {

    this.selectedState =
      this.states.find(
        (state) =>
          state.uf === this.state,
      );

    this.cities =
      this.selectedState?.cities ?? [];

    if (clearCity) {
      this.city = '';
    }
  }


  /* =====================================================
     CEP
  ===================================================== */

  protected formatCep(): void {
    const numbers =
      this.cep
        .replace(/\D/g, '')
        .slice(0, 8);

    if (numbers.length > 5) {

      this.cep =
        `${numbers.slice(0, 5)}-${numbers.slice(5)}`;

    } else {

      this.cep = numbers;

    }
  }

  protected async searchCep(): Promise<void> {
    const cleanCep =
      this.cep.replace(
        /\D/g,
        '',
      );

    if (cleanCep.length !== 8) {
      return;
    }

    this.loadingCep = true;
    this.cepError = '';

    try {

      const response =
        await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`,
        );

      if (!response.ok) {
        throw new Error(
          'Erro ao consultar o CEP.',
        );
      }

      const data =
        await response.json();

      if (data.erro) {

        this.cepError =
          'CEP não encontrado.';

        return;
      }

      this.neighborhood =
        data.bairro ?? '';

      this.city =
        data.localidade ?? '';

      const uf =
        data.uf ?? '';

      if (uf) {

        this.state = uf;

        this.onStateChange(false);

      }

    } catch {

      this.cepError =
        'Não foi possível consultar o CEP. ' +
        'Preencha o endereço manualmente.';

    } finally {

      this.loadingCep = false;

    }
  }


  /* =====================================================
     VIDA CRISTÃ
  ===================================================== */

  protected onBaptizedChange(): void {
    if (this.baptized) {
      return;
    }

    this.baptismDate = '';
    this.baptismPlace = '';
  }


  /* =====================================================
     FUNÇÕES DA OBRA
  ===================================================== */

  protected onMinistryChange(): void {
    if (this.hasWorkedInMinistry) {
      return;
    }

    this.ministryRoles = [];
  }

  protected toggleMinistryRole(
    role: MinistryRole,
  ): void {

    if (
      this.ministryRoles.includes(role)
    ) {

      this.ministryRoles =
        this.ministryRoles.filter(
          (item) => item !== role,
        );

      return;
    }

    this.ministryRoles = [
      ...this.ministryRoles,
      role,
    ];
  }


  /* =====================================================
     SALVAR
  ===================================================== */

  protected submitForm(): void {
    if (!this.fullName.trim()) {
      return;
    }

    if (!this.birthDate) {
      return;
    }

    const member: Member = {

      id:
        this.member?.id ??
        Date.now(),

      // Dados pessoais
      fullName:
        this.fullName.trim(),

      birthDate:
        this.birthDate,

      photoUrl:
        this.photoUrl.trim() ||
        undefined,

      // Contato
      phone:
        this.phone.trim(),

      hasWhatsApp:
        this.hasWhatsApp,

      email:
        this.email.trim() ||
        undefined,

      // Endereço
      state:
        this.state,

      city:
        this.city,

      cep:
        this.cep,

      neighborhood:
        this.neighborhood.trim(),

      block:
        this.block.trim(),

      set:
        this.set.trim(),

      house:
        this.house.trim(),

      // Vida cristã
      baptized:
        this.baptized,

      baptismDate:
        this.baptized
          ? this.baptismDate ||
            undefined
          : undefined,

      baptismPlace:
        this.baptized
          ? this.baptismPlace.trim() ||
            undefined
          : undefined,

      baptizedInHolySpirit:
        this.baptizedInHolySpirit,

      // Atuação na obra
      hasWorkedInMinistry:
        this.hasWorkedInMinistry,

      ministryRoles:
        this.hasWorkedInMinistry
          ? [...this.ministryRoles]
          : [],

      // Controle
      createdAt:
        this.member?.createdAt ??
        new Date().toISOString(),

    };

    this.save.emit(member);
  }


  /* =====================================================
     CANCELAR
  ===================================================== */

  protected cancelForm(): void {
    this.cancel.emit();
  }
}
