import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  HandHeart,
  LockKeyhole,
  LucideAngularModule,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-angular';

import { PrayerService } from '../../services/prayer.service';
import { PrayerRequest } from '../../models/prayer-request.model';

@Component({
  selector: 'app-prayer-admin',
  imports: [
    DatePipe,
    LucideAngularModule,
  ],
  templateUrl: './prayer-admin.html',
  styleUrl: './prayer-admin.css',
})
export class PrayerAdmin implements OnInit {
  protected requests: PrayerRequest[] = [];

  protected selectedRequest: PrayerRequest | null = null;

  protected readonly HandHeart = HandHeart;
  protected readonly Clock3 = Clock3;
  protected readonly CheckCircle2 = CheckCircle2;
  protected readonly Check = Check;
  protected readonly Eye = Eye;
  protected readonly LockKeyhole = LockKeyhole;
  protected readonly RotateCcw = RotateCcw;
  protected readonly Trash2 = Trash2;
  protected readonly X = X;

  constructor(
    private readonly prayerService: PrayerService,
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  protected loadRequests(): void {
    this.requests = this.prayerService.getAll();
  }

  protected get totalRequests(): number {
    return this.requests.length;
  }

  protected get pendingRequests(): number {
    return this.requests.filter(
      (request) => request.status === 'pending',
    ).length;
  }

  protected get answeredRequests(): number {
    return this.requests.filter(
      (request) => request.status === 'answered',
    ).length;
  }

  protected viewRequest(request: PrayerRequest): void {
    this.selectedRequest = request;
  }

  protected closeRequest(): void {
    this.selectedRequest = null;
  }

  protected markAsAnswered(request: PrayerRequest): void {
    const updatedRequest: PrayerRequest = {
      ...request,
      status: 'answered',
    };

    this.prayerService.update(updatedRequest);

    this.loadRequests();

    if (this.selectedRequest?.id === request.id) {
      this.selectedRequest = updatedRequest;
    }
  }

  protected markAsPending(request: PrayerRequest): void {
    const updatedRequest: PrayerRequest = {
      ...request,
      status: 'pending',
    };

    this.prayerService.update(updatedRequest);

    this.loadRequests();

    if (this.selectedRequest?.id === request.id) {
      this.selectedRequest = updatedRequest;
    }
  }

  protected deleteRequest(request: PrayerRequest): void {
    const confirmed = window.confirm(
      `Deseja realmente excluir o pedido de ${request.name}?`,
    );

    if (!confirmed) {
      return;
    }

    this.prayerService.delete(request.id);

    this.loadRequests();

    if (this.selectedRequest?.id === request.id) {
      this.selectedRequest = null;
    }
  }
}
