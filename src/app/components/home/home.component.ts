import { Component, inject } from '@angular/core';
import { RssService } from '../../services/rss.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  service = inject(RssService);
  
}
