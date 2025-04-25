import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RssService } from '../../services/rss.service';
import { Rss } from '../../models/rss';
import { Reddit } from '../../models/reddit';

@Component({
  selector: 'app-drower-card',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './drower-card.component.html',
  styleUrl: './drower-card.component.scss'
})
export class DrowerCardComponent {

  service = inject(RssService);

  isVisible = true;

  filterRss(rss: Rss) {
    rss.isHidden = !rss.isHidden
  }

  filterRedd(redd: Reddit) {
    redd.isHidden = !redd.isHidden
    }
}
