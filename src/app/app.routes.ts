import { Routes } from '@angular/router';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

import { Home } from './features/home/pages/home/home';
import { Testimonials } from './features/testimonials/pages/testimonials/testimonials';
import { TestimonialDetail } from './features/testimonials/pages/testimonial-detail/testimonial-detail';
import { Missions } from './features/mission/pages/missions/missions';
import {
  Missions as AdminMissions,
} from './features/admin/pages/missions/missions';
import { Ministries as AdminMinistries } from './features/admin/pages/ministries/ministries';
import { MissionDetail } from './features/mission/pages/mission-detail/mission-detail';
import { Ministries } from './features/ministry/pages/ministries/ministries';
import { MinistryDetail } from './features/ministry/pages/ministry-detail/ministry-detail';
import { Prayer } from './features/prayer/pages/prayer/prayer';
import { Contact } from './features/contact/pages/contact/contact';
import { NotFound } from './shared/pages/not-found/not-found';

import { Login } from './features/auth/pages/login/login';
import { Dashboard } from './features/admin/pages/dashboard/dashboard';

import { authGuard } from './core/guards/auth.guard';

import { AdminTestimonials } from './features/admin/pages/testimonials/testimonials';
import { Members } from './features/members/pages/members/members';
import { MemberDetail } from './features/members/pages/member-detail/member-detail';
import { PrayerAdmin } from './features/prayer/pages/prayer-admin/prayer-admin';
import { Settings } from './features/admin/pages/settings/settings';
import { EventDetail } from './features/events/pages/event-detail/event-detail';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'eventos/:id',
        component: EventDetail,
      },
      {
        path: 'testemunhos',
        component: Testimonials,
      },
      {
        path: 'testemunhos/:id',
        component: TestimonialDetail,
      },
      {
        path: 'obra',
        component: Missions,
      },
      {
        path: 'obra/:id',
        component: MissionDetail,
      },
      {
        path: 'ministerio',
        component: Ministries,
      },
      {
        path: 'ministerio/:name',
        component: MinistryDetail,
      },
      {
        path: 'pedir-oracao',
        component: Prayer,
      },
      {
        path: 'contato',
        component: Contact,
      },
    ],
  },

  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
      },
    ],
  },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'testemunhos',
        component: AdminTestimonials,
      },
      {
        path: 'missoes',
        component: AdminMissions,
      },
      {
        path: 'membros',
        component: Members,
      },
      {
        path: 'membros/:id',
        component: MemberDetail,
      },
      {
        path: 'oracoes',
        component: PrayerAdmin,
      },
      {
        path: 'ministerios',
        component: AdminMinistries,
      },
      {
        path: 'configuracoes',
        component: Settings,
      },
    ],
  },

  {
    path: '**',
    component: NotFound,
  },
];
