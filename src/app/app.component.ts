import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RssService } from './services/rss.service';
import { HeaderComponent } from "./components/header/header.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  service = inject(RssService)
  title = 'feed-reader';
}

