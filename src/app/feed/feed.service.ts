import { Injectable, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class FeedService {

    @Output() words: EventEmitter<any> = new EventEmitter();

    constructor(@Inject(HttpClient) private http: HttpClient) {
        this.getJSON().subscribe(titlesArray => {
            let tempFeedWordsArray = [];
            titlesArray.forEach((titleLine) => {
                titleLine = titleLine.replace(/[^a-zA-Z0-9 ]/g, "").toLocaleLowerCase();
                tempFeedWordsArray.push(...titleLine.split(" "));
            })

            // Cool trick: set has unique entries, then use spread to turn back into array
            this.words.emit([...new Set(tempFeedWordsArray)]);
            
        });
    }

    // return JSON data as an observable of type any
    public getJSON(): Observable<any> {
        return this.http.get('http://localhost:3000/titles');
    }

    // let jsonURL = 'assets/SampleJson.json';

    // this.getJSON().subscribe(data => {
    //     console.log(data);
    // });

    // public getJSON(): Observable<any> {
    //     return this.http.get(this._jsonURL);
    // }

    public getWords() {

        return this.words;
        // console.log("Feed titles: ",feedTitles);
        // read todays feeds from the files in the feedsArray f
        // from the JSON

        // this can be done at the top of the file with
        // import SampleJson from '../../assets/SampleJson.json';
        // but we need a dynamic file name 

        // FALLBACK to a random file??
    }
}