import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RssService {
  readonly URL = 'https://www.ilsecoloxix.it/rss/copertina.xml'
  constructor() {
    this.getData()
  }

  getData() {



    fetch(this.URL).then(res => res.text()).then(xmlText => {
      const parser = new DOMParser();
      const data = parser.parseFromString(xmlText, 'text/xml')

      console.log(data)
    })


  }
}
