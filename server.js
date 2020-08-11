let Parser = require('rss-parser');
let parser = new Parser();
const http = require('http');

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World!');
  }
  
  const server = http.createServer(requestListener);
  server.listen(8080);

class MakeFeedFile {

    constructor(feedsURLArray) {
        this.feedsURLArray = feedsURLArray;
        this.fs = require('fs');
        this.wordsArray = [];

        this.todaysJsonFeedTitlesFile = () => {
            const today = new Date();
            const todaysDate = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + today.getFullYear()).slice(-2);
            return `./public/feed-title-files/feed-titles_${todaysDate}.json`;
        }

        this.convertTitlesArrayToCSV = ( titlesArray ) => {
            return titlesArray.join("/n");
        }

        this.writeTodaysFeedFile = async (readFile) => {

            let newTitlesArray = [];
            let rawFeedsJSON = this.fs.readFileSync('./public/au_rss_news_feeds.json');
            let { auFeeds } = JSON.parse(rawFeedsJSON);

            await Promise.allSettled(
                auFeeds.map(( feedURL ) => {
                    return (async () => {
                        let feed = await parser.parseURL(feedURL);
                        feed.items.forEach(item => {
                            newTitlesArray.push('"' + item.title + '"');
                            return item.title;
                        });
                    })()
                })
            ).then(() => {
                console.log("newTitlesArray ",newTitlesArray);
                // create the JSON string to write to today's title file:
                const todaysTempJSON = `{"titles" :[
                        ${newTitlesArray.join(",")}
                ]}
                    `;
                    console.log("JSON ",todaysTempJSON);

                this.fs.writeFile(this.todaysJsonFeedTitlesFile(), todaysTempJSON, function (err) {
                    if (err) return console.log(err);
                    console.log(newTitlesArray.length + ' written to new file ');
                });
            }).catch(reasons => {
                console.log("Error somewhere with RSS feed promises: ",reasons);
            });

            
        }

        // this.readTodaysFeedTitles = () => {

        //     let tempWordsArray = [];

        //     const titles = new Promise((resolve) => {

        //         this.fs.readFile(this.todaysJsonFeedTitlesFile(), 'utf8', function (err,data) {
        //             if(err){ throw err; }
        //             let titlesArray = data.split("\n");
        //             titlesArray.forEach((titleLine) => {
        //                 titleLine = titleLine.replace(/[^a-zA-Z0-9 ]/g, "").toLocaleLowerCase();
        //                 tempWordsArray.push(...titleLine.split(" "));
        //             })
    
        //             let wordsArray =  [...new Set(tempWordsArray)];
    
        //             resolve(wordsArray);
    
        //         });
        //     });
    
        //     titles.then((titlesArray) => {
        //         console.log("titlesArray " + titlesArray);
        //         this.wordsArray = titlesArray;   
        //     })
        // }
    }
    

    getFeeds() {

        const todaysFile = this.todaysJsonFeedTitlesFile();

        try {
            if (!this.fs.existsSync(todaysFile)) {
                console.log("todaysFile NO");
                this.writeTodaysFeedFile();
                // this.readTodaysFeedTitles();
            }
        } catch(err) {
            console.log("Uh oh! An error: ",err);
        }        
    }
}

let makeFeeds = new MakeFeedFile();

makeFeeds.getFeeds();
