import { Component } from '@angular/core';

@Component({
  selector: 'feed-app',
  template: `
  <router-outlet></router-outlet>
  `
})
export class FeedAppComponent {
  title = 'fake-news-generator';
}
