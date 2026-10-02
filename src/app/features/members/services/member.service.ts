import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MEMBERS } from '../data/members.data';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly storageKey =
    'church_members';

  private readonly membersSubject =
    new BehaviorSubject<Member[]>([]);

  readonly members$ =
    this.membersSubject.asObservable();

  constructor() {
    this.initializeStorage();

    this.membersSubject.next(
      this.getAll()
    );
  }

  getAll(): Member[] {
    const storedMembers =
      localStorage.getItem(
        this.storageKey
      );

    if (!storedMembers) {
      return [...MEMBERS];
    }

    try {
      const parsedMembers =
        JSON.parse(
          storedMembers
        ) as Partial<Member>[];

      return parsedMembers.map(
        (member) =>
          this.normalizeMember(
            member
          )
      );
    } catch {
      return [...MEMBERS];
    }
  }

  getById(
    id: number
  ): Member | undefined {
    return this.getAll().find(
      (member) =>
        member.id === id
    );
  }

  saveAll(
    members: Member[]
  ): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(members)
    );

    this.membersSubject.next(
      [...members]
    );
  }

  create(
    member: Member
  ): Member[] {
    const currentMembers =
      this.getAll();

    const updatedMembers = [
      ...currentMembers,
      member,
    ];

    this.saveAll(
      updatedMembers
    );

    return updatedMembers;
  }

  update(
    member: Member
  ): Member[] {
    const currentMembers =
      this.getAll();

    const updatedMembers =
      currentMembers.map(
        (item) =>
          item.id === member.id
            ? member
            : item
      );

    this.saveAll(
      updatedMembers
    );

    return updatedMembers;
  }

  delete(
    id: number
  ): Member[] {
    const currentMembers =
      this.getAll();

    const updatedMembers =
      currentMembers.filter(
        (member) =>
          member.id !== id
      );

    this.saveAll(
      updatedMembers
    );

    return updatedMembers;
  }

  private initializeStorage(): void {
    const storedMembers =
      localStorage.getItem(
        this.storageKey
      );

    if (!storedMembers) {
      this.saveAll([
        ...MEMBERS,
      ]);

      return;
    }

    try {
      const savedMembers =
        JSON.parse(
          storedMembers
        ) as Partial<Member>[];

      const normalizedMembers =
        savedMembers.map(
          (member) =>
            this.normalizeMember(
              member
            )
        );

      const savedIds =
        new Set(
          normalizedMembers.map(
            (member) =>
              member.id
          )
        );

      const missingMembers =
        MEMBERS.filter(
          (member) =>
            !savedIds.has(
              member.id
            )
        );

      const updatedMembers = [
        ...normalizedMembers,
        ...missingMembers,
      ];

      this.saveAll(
        updatedMembers
      );
    } catch {
      this.saveAll([
        ...MEMBERS,
      ]);
    }
  }

  private normalizeMember(
    member: Partial<Member>
  ): Member {
    return {
      id:
        member.id ??
        Date.now(),

      fullName:
        member.fullName ?? '',

      birthDate:
        member.birthDate ?? '',

      photoUrl:
        member.photoUrl ?? '',

      phone:
        member.phone ?? '',

      hasWhatsApp:
        member.hasWhatsApp ??
        false,

      email:
        member.email ?? '',

      state:
        member.state ?? '',

      city:
        member.city ?? '',

      cep:
        member.cep ?? '',

      neighborhood:
        member.neighborhood ?? '',

      block:
        member.block ?? '',

      set:
        member.set ?? '',

      house:
        member.house ?? '',

      baptized:
        member.baptized ??
        false,

      baptismDate:
        member.baptismDate,

      baptismPlace:
        member.baptismPlace,

      baptizedInHolySpirit:
        member.baptizedInHolySpirit ??
        false,

      hasWorkedInMinistry:
        member.hasWorkedInMinistry ??
        false,

      ministryRoles:
        member.ministryRoles ??
        [],

      createdAt:
        member.createdAt ??
        new Date().toISOString(),
    };
  }
}
