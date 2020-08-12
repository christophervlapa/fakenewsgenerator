import { Routes } from '@angular/router';

import { Error404Component } from './errors/404.component';
import { FeedAppComponent } from './feed-app.component';
import { FeedDisplayComponent } from './feed/feed-display.component';

export const appRoutes:Routes = [
    { path: 'news-feed', component: FeedDisplayComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/news-feed', pathMatch: 'full' }
]