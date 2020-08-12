import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FeedAppComponent } from './feed-app.component';
import { FeedDisplayComponent } from './feed/feed-display.component';
import { Error404Component } from './errors/404.component';

import { FeedService } from './feed/feed.service';

import { appRoutes } from './routes';

@NgModule({
  declarations: [
    FeedAppComponent,
    FeedDisplayComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), // All the router providers and directives go here, route objs come from appRoutes obj in routes.ts https://angular.io/api/router/RouterModule#forRoot
    HttpClientModule
  ],
  providers: [
    FeedService,
    HttpClientModule
  ],
  bootstrap: [FeedAppComponent]
})
export class AppModule { }
