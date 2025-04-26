import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Article } from '../../models/article';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, TruncatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() article!: Article;

  ngOnInit(): void {

  }
}

function truncateText(text: string, maxLength: number): string {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + '...';
}

