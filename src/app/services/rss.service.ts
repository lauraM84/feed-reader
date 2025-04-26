import { effect, Injectable, signal } from '@angular/core';
import { parseStringPromise } from 'xml2js'
import { Article } from '../models/article';
import { feed } from '../models/feed';
import { decode } from 'he';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  rssFeed = signal<feed[]>([]);
  redditFeed = signal<feed[]>([]);
  joinedArray = signal<Article[]>([]);

  constructor() {

    this.storageAlignment()

    effect(() => {
      this.saveRssFeed()
      this.saveRedditFeed()
    })

    this.getData()
  }

  storageAlignment() {
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

  saveRedditFeed() {
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
    console.log("rss Array", rssDataArray);
    console.log("reddit Array", redditDataArray);

    this.joinedArray.set([...rssDataArray, ...redditDataArray]);

    console.log(this.joinedArray());

    return this.orderArrayByDate(this.joinedArray());

  }

  async getRssFeed() {
    const rssDataArray: Article[] = [];

    for (const rssArticle of this.rssFeed()) {
      const data = await fetch(rssArticle.url).then(res => res.text()).then(xmlText => {
        const xmlData = parseStringPromise(xmlText, { explicitArray: false });
        return xmlData;
      })
      const articleRss: Article[] = data.rss.channel.item.flat().map((rss: any) => {
        const date = new Date(rss.pubDate).getTime();
        const rssObj: Article = {
          title: rss.title,
          desc: decodeDescription(rss.description),
          img: rss.enclosure?.$.url || rss.image?.url,
          creationDate: date,
          link: rss.link,
          category: data.rss.channel.title,
          baseUrl: rssArticle.url,
        };
        return rssObj;
      });
      rssDataArray.push(...articleRss);
    };
    return rssDataArray;
  }


  async getRedditFeed() {
    const redditDataArray = []
    for (const reddit of this.redditFeed()) {
      const url = reddit.url.replace(/\/$/, "") + ".json";
      const data = await fetch(url).then(res => res.json());
      const fromAnyarrayToArticleArray = data.data.children;
      const finaldata: Article[] = fromAnyarrayToArticleArray.map((post: any) => {
        const redditObj: Article = {
          title: post.data.title,
          desc: decodeDescription(post.data.selftext),
          img: decode(post.data.preview?.images[0]?.source.url || post.data.thumbnail),
          creationDate: post.data.created,
          link: post.data.url,
          category: post.data.subreddit,
          baseUrl: reddit.url,
        }
        return redditObj;
      });
      redditDataArray.push(...finaldata);
    }
    return redditDataArray;
  }

  orderArrayByDate(data:Article[]) {
    const sortedData = data.sort((a, b) => b.creationDate - a.creationDate);
    return sortedData;
  }
}


function decodeDescription(description: string): string {
  return removeImageTags(decode(description));
}

function removeImageTags(html: string): string {
  return html.replace(/<img[^>]*>/gi, '');
}