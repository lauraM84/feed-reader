import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-card',
  imports: [CommonModule, CardComponent],
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.scss'
})
export class ListCardComponent {
  articles = input<Article[]>([]);
}
