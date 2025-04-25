import { effect, Injectable, signal } from '@angular/core';
import { Rss } from '../models/rss';
import { Reddit } from '../models/reddit';
import { parseStringPromise } from 'xml2js'
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  rssFeed = signal<Rss[]>([]);
  redditFeed = signal<Reddit[]>([]);

  constructor() {

    this.storageAlignment()

    effect(() => {
     this.saveRssFeed()
     this.saveRedditFeed()
    })

    this.getData()
  }

  storageAlignment(){
    const rssFeedString = localStorage.getItem("rssFeed");
    if (rssFeedString) {
      this.rssFeed.set(JSON.parse(rssFeedString));
    }

    const redditFeedString = localStorage.getItem("redditFeed")
    if (redditFeedString) {
      this.redditFeed.set(JSON.parse(redditFeedString));
    }
  }

  saveRssFeed() {
    const rssFeedString = localStorage.getItem("rssFeed");
    if (rssFeedString) {

      localStorage.removeItem("rssFeed")
      localStorage.setItem("rssFeed", JSON.stringify(this.rssFeed()));
      
    } else {

      localStorage.setItem("rssFeed", JSON.stringify(this.rssFeed()));

    }
  }

  saveRedditFeed(){
    const redditFeedString = localStorage.getItem("redditFeed");
    if (redditFeedString) {

      localStorage.removeItem("redditFeed")
      localStorage.setItem("redditFeed", JSON.stringify(this.redditFeed()));
      
    } else {

      localStorage.setItem("redditFeed", JSON.stringify(this.redditFeed()));

    }
  }

  async getData() {

    const rssDataArray = await this.getRssFeed();
    const redditDataArray = await this.getRedditFeed();
    // console.log("rss Array", rssDataArray);
    // console.log("reddit Array", redditDataArray);

    const joinedArray = [...rssDataArray, ...redditDataArray];

    console.log(joinedArray);

    return this.orderArrayByDate(joinedArray)

  }

  async getRssFeed(){
    const rssDataArray: Article[] = [];

    for (const rss of this.rssFeed()) {
      const data = await fetch(rss.journalUrl).then(res => res.text()).then(xmlText => {
        const xmlData = parseStringPromise(xmlText, {explicitArray:false});
        return xmlData;
      })
      console.log(data);
      const articleRss: Article[] = data.rss.channel.item.flat().map((rss:any) => {
        const date = new Date(rss.pubDate).getTime();
        const rssObj:Article = {
          title: rss.title,
          desc: rss.description,
          creationDate: date,
          link: rss.link,
          category: data.rss.channel.title,
        };
        return rssObj;
      });
      rssDataArray.push(...articleRss);
    };
    console.log(rssDataArray);
    return rssDataArray;
  }

  async getRedditFeed(){
    const redditDataArray = []
    for (const reddit of this.redditFeed()) {
      const url = reddit.subRedditUrl.replace(/\/$/, "") + ".json";
      const data = await fetch(url).then(res => res.json());
      redditDataArray.push(data.data.children)
    }
    return redditDataArray.flat().map(({data:{title, selftext:desc, created: creationDate, url: link,subreddit: category}}) => {
      const redditObj:Article = {
        title,
        desc,
        creationDate,
        link,
        category,
      }
      return redditObj;
    });
  }

  orderArrayByDate(data: Article[]) {
    const sortedData = data.sort((a,b) => b.creationDate - a.creationDate);
    return sortedData;
  }
}
