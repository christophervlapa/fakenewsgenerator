let Parser = require('rss-parser');
let parser = new Parser();

class MakeFeedFile {

    constructor(feedsURLArray) {
        this.feedsURLArray = feedsURLArray;
        this.fs = require('fs');
        this.wordsArray = [];

        this.todaysJsonFeedTitlesFile = () => {
            const today = new Date();
            const todaysDate = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + today.getFullYear()).slice(-2);
            return `./public/feed-title-files/feed-titles_${todaysDate}.csv`;
        }

        this.convertTitlesArrayToCSV = ( titlesArray ) => {
            return titlesArray.join("/n");
        }

        this.writeTodaysFeedFile = async () => {

            let newTitlesArray = [];
            let rawFeedsJSON = this.fs.readFileSync('./public/au_rss_news_feeds.json');
            let { auFeeds } = JSON.parse(rawFeedsJSON);

            await Promise.allSettled(
                auFeeds.map(( feedURL ) => {
                    return (async () => {
                        let feed = await parser.parseURL(feedURL);
                        feed.items.forEach(item => {
                            newTitlesArray.push(item.title);
                            return item.title;
                        });
                    })()
                })
            ).then(() => {
                console.log("newTitlesArray ",newTitlesArray);
                this.fs.writeFile(this.todaysJsonFeedTitlesFile(), newTitlesArray.join("\n"), function (err) {
                    if (err) return console.log(err);
                    console.log(newTitlesArray.length + ' written to new file ' + this.todaysJsonFeedTitlesFile());
                });
            }).catch(reasons => {
                console.log("results ",reasons);
            });

            
        }

        this.readTodaysFeedTitles = () => {

            let tempWordsArray = [];

            const titles = new Promise((resolve) => {

                this.fs.readFile(this.todaysJsonFeedTitlesFile(), 'utf8', function (err,data) {
                    if(err){ throw err; }
                    let titlesArray = data.split("\n");
                    titlesArray.forEach((titleLine) => {
                        titleLine = titleLine.replace(/[^a-zA-Z0-9 ]/g, "").toLocaleLowerCase();
                        tempWordsArray.push(...titleLine.split(" "));
                    })
    
                    let wordsArray =  [...new Set(tempWordsArray)];
    
                    resolve(wordsArray);
    
                });
            });
    
            titles.then((titlesArray) => {
                console.log("titlesArray " + titlesArray);
                this.wordsArray = titlesArray;   
            })
        }
    }
    

    getFeeds() {

        const todaysFile = this.todaysJsonFeedTitlesFile();

        try {
            if (this.fs.existsSync(todaysFile)) {
                console.log("todaysFile YES");
                this.readTodaysFeedTitles();
            } else {
                console.log("todaysFile NO");
                this.writeTodaysFeedFile();
                this.readTodaysFeedTitles();
            }
        } catch(err) {
            
        }        
    }
}

let makeFeeds = new MakeFeedFile();

makeFeeds.getFeeds();
