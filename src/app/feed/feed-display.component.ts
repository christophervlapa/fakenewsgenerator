import { Component, Inject, OnInit } from '@angular/core';
import { FeedService } from './feed.service';


@Component({
    templateUrl: 'feed-display.component.html'
})
export class FeedDisplayComponent  implements OnInit {
    constructor(
        @Inject(FeedService) private feedService:FeedService
    ){}

    ngOnInit(){
        this.feedService.words.subscribe((words: any) => {
            console.log("Words: ",words);
            
        })
        
    }
    


}