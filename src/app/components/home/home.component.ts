import { Component, inject, input, signal } from '@angular/core';
import { RssService } from '../../services/rss.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { DrowerCardComponent } from "../drower-card/drower-card.component";
import { CardComponent } from "../card/card.component";
import { Article } from '../../models/article';
import { feed } from '../../models/feed';

@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, MatButtonModule, DrowerCardComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
  service = inject(RssService);
  showFiller = false;
  isSidebarOpen = input(false);
  displayArray = signal<Article[]>([]); //l'array in cui mettere i dati dal service per poter creare le card

  filterCards(feed:feed){
      console.log(feed);
      console.log(this.displayArray());
      if(this.displayArray().some(article => article.baseUrl === feed.url)){
        this.displayArray.set(this.displayArray().filter(article => article.baseUrl !== feed.url));
        console.log(this.displayArray());
      } else {
        const arrayToAdd = this.service.joinedArray().filter(article => article.baseUrl === feed.url);
        this.displayArray.update(oldArray => oldArray.concat(arrayToAdd));
        console.log(this.displayArray());
      }
  }
}