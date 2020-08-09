const { resolve } = require('path');
let Parser = require('rss-parser');
let parser = new Parser();

class MakeFeedFile {

    constructor(feedsURLArray) {
        this.feedsURLArray = feedsURLArray;
        this.fs = require('fs');
        this.wordsArray = ["bar"];

        this.todaysJsonFeedTitlesFile = () => {
            const today = new Date();
            const todaysDate = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + today.getFullYear()).slice(-2);
            return `./public/feed-title-files/feed-titles_${todaysDate}.csv`;
        }

        // convert CSV data from file to array, split all the titles into words
        // Then remove duplicate words
        // @TODO phase two, not MVP
        this.curateWordsFromTitles = (word) => {
            if(word.length > 1 || word.regex.exec(['a-zA-Z'])) {
                return word.replace(/[^\w\s]/gi, '')
            }

        }

        this.convertTitlesArrayToCSV = ( titlesArray ) => {
            return titlesArray.join("/n");
        }

        // this.getRSSFeedTitles = () => {



        //     const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        //     const { auFeeds } = "./public/au_rss_news_feeds.json";
        //     // let tempArr = []
        //     console.log("auFeeds ",auFeeds);

        //     let map1 = feeds.map(( feedURL ) => {
        //         return parser.parseURL( CORS_PROXY + feedURL, function(err, feed) {
        //             if (err) {
        //                 console.error("FEED: ",feedURL);
        //                 throw err;
        //             }
        //             feed.items.forEach(function(entry) {
        //                 // console.log(entry.title);
        //                 tempArr.push(entry.title);
        //             })
        //         })
        //     })

        //     // Promise.all(map1).then((values) => {
        //     //     console.log("tempArr ",tempArr)
        //     // return tempArr;
        // }

        this.todaysJsonFeedTitlesFile = () => {
            const today = new Date();
            const todaysDate = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + today.getFullYear()).slice(-2);
            return `./public/feed-title-files/feed-titles_${todaysDate}.csv`;
            // return `./public/feed-title-files/feed-titles_07-08-20.csv`;
        }

        this.writeTodaysFeedFile = () => {

            let newTitlesArray = [];
            const { auFeeds } = "./public/au_rss_news_feeds.json";

            const map1 = new Promise((resolve) => {
                auFeeds.forEach(( feedURL ) => {
                    console.log("feedURL ",feedURL)
                    let feed = parser.parseURL(feedURL);
                    feed.items.forEach(item => {
                        console.log(item.title)
                        newTitlesArray.push(item.title);
                    });
                })

                resolve((newTitlesArray) => {
                    console.log("newTitlesArray", newTitlesArray)
                });
            })

            map1.then((todaysTitles) => {

                console.log("todaysTitles ",todaysTitles);
                this.fs.writeFile(this.todaysJsonFeedTitlesFile(), todaysTitles.join("\n"), function (err) {
                    if (err) return console.log(err);
                    console.log('Hello World > helloworld.txt');
                });
            })
        }

        this.readTodaysFeedTitles = () => {

            let tempWordsArray = [];

            const titles = new Promise((resolve) => {

                this.fs.readFile(this.todaysJsonFeedTitlesFile(), 'utf8', function (err,data) {
                    if(err){
                        throw err;
                    }
    
                    let titlesArray = data.split("\n");
    
                    titlesArray.forEach((titleLine) => {
                        tempWordsArray.push(...titleLine.split(" "));
                    })
    
                    let wordsArray =  [...new Set(tempWordsArray)];
    
                    resolve(wordsArray);
    
                });
            });
    
            titles.then((titlesArray) => {
                this.wordsArray = titlesArray;   
            })
        }

    }

    getFeeds() {

        let todaysFile = this.todaysJsonFeedTitlesFile();

        try {
            if (this.fs.existsSync(todaysFile)) {
                console.log("todaysFile YES");
                this.readTodaysFeedTitles();
            } else {
                console.log("todaysFile NO");
                this.writeTodaysFeedTitles();
                this.readTodaysFeedTitles();
            }
        } catch(err) {
            
        }        
    }
}

// module.exports = MakeFeedFile;

let makeFeeds = new MakeFeedFile();

makeFeeds.getFeeds();
