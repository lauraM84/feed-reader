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
      this.displayArray.set(this.displayArray().filter(article => article.baseUrl !== feed.url));
      //devo ancora fare l'if per aggiungerli in caso non ci siano, devo fare un findAll sul joinedArray del service
      //mettere tutti i risultati in un array, e fare un update del displayArray concatenandoci il nuovo array
  }
}