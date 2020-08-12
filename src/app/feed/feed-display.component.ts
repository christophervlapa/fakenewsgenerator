import { Component, Inject, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Component({
    templateUrl: 'feed-display.component.html'
})
export class FeedDisplayComponent  implements OnInit {
    constructor(
        @Inject(FeedService) private feedService:FeedService
    ){}

    newStories = [];
    numberOfStories: number;

    capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getRandomInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    senseMaker = (story: string) => {

        let dumbEndingsArr = ["the", "and", "its", "a", "where", "which", "im", "shes", "hes", "if"];
        if(dumbEndingsArr.includes(story.split(" ").pop())) { // if the story has a dumb ending, trim it
            console.log("DUM ENDING ",story);
            var lastIndex = story.lastIndexOf(" ");
            return story.substring(0, lastIndex);
        }
    }

    ngOnInit(){

        // @TODO need to chain these with RxJS? 
        this.feedService.stories.subscribe((numberOfStories: number) => {
            this.numberOfStories = numberOfStories;
        })

        
        this.feedService.words.subscribe((words: any) => {

            let counter = 0;

            while(counter < this.numberOfStories) {
                let newStoryTitle = "";
                let wordCounter = 0;

                while(wordCounter < this.getRandomInteger(4,12)) {
                    wordCounter++;
                    newStoryTitle = newStoryTitle + " " + words[Math.floor(Math.random()*words.length)];
                }
                counter++;
                this.senseMaker(newStoryTitle);
                this.newStories.push(this.capitalizeFirstLetter(newStoryTitle.trim()));
            }

        })
        

        
        
    }
    


}