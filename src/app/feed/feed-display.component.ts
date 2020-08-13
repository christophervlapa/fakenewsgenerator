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

        let dumbEndingsArr = ["the", "and", "its", "a", "where", "which", "im", "shes", "hes", "if", "there", "she", "he", "very", "just", ];
        if(dumbEndingsArr.includes(story.split(" ").pop())) { // if the story has a dumb ending, trim it
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

            while(counter < (this.numberOfStories / 10)) {
                
                let newStoriesItem = [];
                
                counter++;
                
                // array of 7 stories per item, so that items can be looped thru
                // to build out page
                while(newStoriesItem.length < 10){
                    let wordCounter = 0;
                    let newStoryTitle = "";

                    while(wordCounter < this.getRandomInteger(4,12)) {
                        wordCounter++;
                        newStoryTitle = newStoryTitle + " " + words[Math.floor(Math.random()*words.length)];
                    }
                    this.senseMaker(newStoryTitle);
                    newStoriesItem.push(this.capitalizeFirstLetter(newStoryTitle.trim()));
                }

                this.newStories.push(newStoriesItem);
                
            }

            console.log("this.newStories ",this.newStories);

        })
        

        
        
    }
    


}