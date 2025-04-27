import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Article } from '../../models/article';
import { TruncatePipe } from './truncate.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, TruncatePipe, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() article!: Article;

  shareArticle(article: Article) {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.desc,
        url: article.link,
      }).then(() => {
        console.log('Articolo condiviso con successo');
      }).catch((error) => {
        console.error('Errore nella condivisione:', error);
      });
    } else {
      // Browser non supporta Web Share API
      alert('La condivisione non è supportata su questo browser.');
    }
  }

  saveArticle(article: Article) {

  }
}

