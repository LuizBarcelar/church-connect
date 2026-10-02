import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CHURCH_INFO } from '../../../../core/data/church.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly church = CHURCH_INFO;
}
