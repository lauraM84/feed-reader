import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RssService } from '../../services/rss.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { DrowerCardComponent } from "../drower-card/drower-card.component";
import { Article } from '../../models/article';
import { feed } from '../../models/feed';
import { ListCardComponent } from '../list-card/list-card.component';

@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, MatButtonModule, DrowerCardComponent, ListCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  service = inject(RssService);
  showFiller = false;
  isSidebarOpen = input(false);
  orderedArray = this.service.orderedArray
  areInFavourites = signal<boolean>(false);
  hideFeed = signal<feed[]>([]);

  displayArray = computed<Article[]>(() => {
    let array: Article[];
    if (this.areInFavourites()) {
      array = this.service.getFavourites();
    } else {
      array = this.orderedArray();
    }
    if (this.hideFeed().length > 0) {
      array = array.filter(article => !this.hideFeed().some(feed => article.baseUrl === feed.url));
    }
    return array;
  });


  filterCards(feed: feed) {
    if (this.hideFeed().some(item => item.url === feed.url)) {
      this.hideFeed.update(oldArray => oldArray.filter(item => item.url !== feed.url));
    } else {
      this.hideFeed.update(oldArray => oldArray.concat(feed));
    }
  }

  filterFavourites(show: boolean) {
    this.areInFavourites.set(show);
  }

}