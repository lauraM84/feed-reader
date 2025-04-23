import { Injectable, signal } from '@angular/core';
import { Rss } from '../models/rss';
import { Reddit } from '../models/reddit';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  rssFeed = signal<Rss[]>([]);
  redditFeed = signal<Reddit[]>([]);

  constructor() {
    this.getData()
  }

  

  getData() {

    // fetch(this.URL).then(res => res.text()).then(xmlText => {
    //   const parser = new DOMParser();
    //   const data = parser.parseFromString(xmlText, 'text/xml')

    //   console.log(data)
    // })

  }
}
