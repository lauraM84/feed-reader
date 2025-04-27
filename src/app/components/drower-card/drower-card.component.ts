import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RssService } from '../../services/rss.service';
import { feed } from '../../models/feed';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drower-card',
  imports: [MatCardModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './drower-card.component.html',
  styleUrl: './drower-card.component.scss'
})
export class DrowerCardComponent {

  service = inject(RssService);
  changeVisibility = output<feed>();
  deleteFeed = output();
  favourites = output<boolean>();

  isVisible = true;
  haveToShow = true;

  filterRss(rss: feed) {
    rss.isHidden = !rss.isHidden;
    this.changeVisibility.emit(rss);
  }

  filterRedd(redd: feed) {
    redd.isHidden = !redd.isHidden;
    this.changeVisibility.emit(redd);
  }

  showPreferred() {
    this.favourites.emit(this.haveToShow);
    this.haveToShow = !this.haveToShow;
  }

  delete(feed: feed) {
    this.service.rssFeed.update(old => old.filter(rss => rss.url !== feed.url));
    this.service.redditFeed.update(old => old.filter(reddit => reddit.url !== feed.url));
  }
}
