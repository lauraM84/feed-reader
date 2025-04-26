import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RssService } from '../../services/rss.service';
import { feed } from '../../models/feed';

@Component({
  selector: 'app-drower-card',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './drower-card.component.html',
  styleUrl: './drower-card.component.scss'
})
export class DrowerCardComponent {

  service = inject(RssService);
  changeVisibility = output<feed>();

  isVisible = true;

  filterRss(rss: feed) {
    rss.isHidden = !rss.isHidden;
    this.changeVisibility.emit(rss);
  }

  filterRedd(redd: feed) {
    redd.isHidden = !redd.isHidden;
    this.changeVisibility.emit(redd);
  }

  showPreferred() {
    throw new Error('Method not implemented.');
  }
}
