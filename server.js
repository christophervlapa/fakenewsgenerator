let Parser = require('rss-parser');
let parser = new Parser();
const jsonServer = require('json-server')
const path = require('path')

class MakeFeedFile {

    constructor(feedsURLArray) {
        this.feedsURLArray = feedsURLArray;
        this.fs = require('fs');
        this.wordsArray = [];

        this.todaysJsonFeedTitlesFile = () => {
            const today = new Date();
            const todaysDate = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth()+1)).slice(-2) + '-' + ("0" + today.getFullYear()).slice(-2);
            return `./feed-assets/feed-title-files/feed-titles_${todaysDate}.json`;
        }

        this.convertTitlesArrayToCSV = ( titlesArray ) => {
            return titlesArray.join("/n");
        }

        this.writeTodaysFeedFile = async (readFile) => {

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
                console.log("newTitlesArray ",newTitlesArray);
                // create the JSON string to write to today's title file:
                const todaysTempJSON = `{"titles" :[
                        ${newTitlesArray.join(",")}
                ]}
                    `;
                    // console.log("JSON ",todaysTempJSON);

                this.fs.writeFile(this.todaysJsonFeedTitlesFile(), todaysTempJSON, function (err) {
                    if (err) return console.log(err);
                    console.log(newTitlesArray.length + ' written to new file ');
                });
            }).catch(reasons => {
                console.log("Error somewhere with RSS feed promises: ",reasons);
            });

            
        }
    }
    
    getFeeds() {

        const todaysFile = this.todaysJsonFeedTitlesFile();

        try {
            if (!this.fs.existsSync(todaysFile)) {
                this.writeTodaysFeedFile();
            }
        } catch(err) {
            console.log("Uh oh! An error: ",err);
        }        

        // Serve up the file as JSON
        const server = jsonServer.create();
        const router = jsonServer.router(path.join(__dirname, this.todaysJsonFeedTitlesFile()));
        const middlewares = jsonServer.defaults();
        
        server.use(middlewares);
        server.use(router);
        server.listen(3000, () => {
            console.log('JSON Server is running on http://localhost:3000')
        })
    }
}

let makeFeeds = new MakeFeedFile();

makeFeeds.getFeeds();
