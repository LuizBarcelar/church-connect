import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Mission } from '../../components/mission/mission';
import { Testimonials } from '../../components/testimonials/testimonials';
import { WorldMission } from '../../components/world-mission/world-mission';
import { Ministries } from '../../components/ministries/ministries';
import { Prayer } from '../../components/prayer/prayer';
import { Social } from '../../components/social/social';
import { ChurchLocation } from '../../components/church-location/church-location';
import {
  WeeklyEvents,
} from '../../components/weekly-events/weekly-events';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Mission,
    Testimonials,
    WorldMission,
    Ministries,
    ChurchLocation,
    Prayer,
    Social,
    WeeklyEvents,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
