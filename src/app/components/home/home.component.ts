import { Component, effect, inject, input, signal } from '@angular/core';
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
  displayArray = signal<Article[]>([]);
  areInFavourites = false;

  constructor() {

    effect(() => {
      this.initializeDisplayArray();
    });

  }

  async initializeDisplayArray() {
    const newArray = await this.service.getData();
    this.displayArray.set(newArray);
  }

  filterCards(feed: feed) {
    if (this.displayArray().some(article => article.baseUrl === feed.url)) {
      this.displayArray.set(this.displayArray().filter(article => article.baseUrl !== feed.url));
    } else {
      if (this.areInFavourites) {
        const arrayToAdd = this.service.getFavourites().filter(article => article.baseUrl === feed.url);
        this.displayArray.update(oldArray => this.service.orderArrayByDate(oldArray.concat(arrayToAdd)));
      }
      else {
        const arrayToAdd = this.service.joinedArray().filter(article => article.baseUrl === feed.url);
        this.displayArray.update(oldArray => this.service.orderArrayByDate(oldArray.concat(arrayToAdd)));
      }
    }
  }

  filterFavourites(show: boolean) {
    if (show) {
      this.areInFavourites = true;
      this.displayArray.set(this.service.getFavourites());
    } else {
      this.areInFavourites = false;
      this.displayArray.set(this.service.orderArrayByDate(this.service.joinedArray()))
    }
  }

}