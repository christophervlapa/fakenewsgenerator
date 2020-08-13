let Parser = require('rss-parser');
let parser = new Parser();
const jsonServer = require('json-server')
const path = require('path')

class MakeFeedFile {

    constructor(feedsURLArray) {
        this.feedsURLArray = feedsURLArray;
        this.fs = require('fs');
        this.fsPromises = this.fs.promises;
        this.wordsArray = [];

        this.todaysJsonFeedTitlesFile = () => {
            const today = new Date();
            const todaysDate = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + today.getFullYear()).slice(-2);
            return `./feed-assets/feed-title-files/feed-titles_${todaysDate}.json`;
        }

        this.convertTitlesArrayToCSV = ( titlesArray ) => {
            return titlesArray.join("/n");
        }

        this.todaysFeedFile = async () => {

            let newTitlesArray = [];
            let rawFeedsJSON = this.fs.readFileSync('./feed-assets/au_rss_news_feeds.json');
            let { auFeeds } = JSON.parse(rawFeedsJSON);

            await Promise.allSettled(
                auFeeds.map(( feedURL ) => {
                    return (async () => {
                        let feed = await parser.parseURL(feedURL);
                        feed.items.forEach(item => {
                            let tempTitle = item.title.replace(/[^a-zA-Z0-9 ]/g, "").toLocaleLowerCase();
                            newTitlesArray.push('"' + tempTitle + '"');
                            return item.title;
                        });
                    })()
                })
            ).then(() => {
                
                // create the JSON string to write to today's title file:
                const todaysTempJSON = `{"titles" :[
                        ${newTitlesArray.join(",")}
                ]}
                    `;

                    this.fsPromises.writeFile(this.todaysJsonFeedTitlesFile(), todaysTempJSON,'utf8').then(() => {

                        console.log(newTitlesArray.length + ' titles written to new file ');

                        // Only once it's written start the JSON server, otherwise we get an empty feed
                        const server = jsonServer.create();
                        const router = jsonServer.router(path.join(__dirname, this.todaysJsonFeedTitlesFile()));
                        const middlewares = jsonServer.defaults();
                        server.use(middlewares);
                        server.use(router);
                        server.listen(3000, () => {
                            console.log('JSON Server is running on http://localhost:3000')
                        })

                    }).catch(err => {
                        console.log("Error writing to file: " + err)
                    })
                this.fs.writeFile(this.todaysJsonFeedTitlesFile(), todaysTempJSON, function (err) {
                    if (err) return console.log(err);
                    
                });

                
            }).catch(reasons => {
                console.log("Error somewhere with RSS feed promises: ",reasons);
            });
        }
    }
    
    getFeeds() {

        const todaysFile = this.todaysJsonFeedTitlesFile();

        this.fsPromises.access(todaysFile, this.fs.constants.R_OK | this.fs.constants.W_OK)
        .then(() => {
            console.error('file exists can access')
        })
        .catch(() => {
            console.log("writing todays file ")
            this.todaysFeedFile()
            
        });     
    }
}

let makeFeeds = new MakeFeedFile();

makeFeeds.getFeeds();
