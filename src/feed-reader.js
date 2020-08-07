import React from 'react';
// import RssParser from 'rss-parser';
// var parser = new RssParser();

class FeedReader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: ["How to create a video streaming website in 2020", "Plumbing problems – what to do when you spot a leak", "Sexy Stuff! Sean Borg surprises his army of Instag…ith saucy throwback snaps from his pop music days", "WordPress vs. Webflow – a comparison between two contemporaries", "4 Best Plumbers in Parramatta", "7 Tips to improve diesel fuel mileage", "5 things to think about when planning a kitchen remodel", "Top must have features of a progressive web app", "5 best social media platforms to share your marketing videos", "Paving or decking: 5 things to consider before you decide", "5 Instagram widget tools to leverage For 2020", "A helpful blueprint for how to succeed in life", "The best restaurants in Melbourne for restaurant-quality takeaway meals", "Inside the career of Zhi Ko, aka NekozTek", "How Amer Safaee runs his company Bama Security Group", "Photography Tips for Instagram Bloggers: How to Shoot Better Pictures with Your Smartphone", "Crazy Rise… Simplifying the ardent process of lead generation!", "Gal Gadot is proving she is a force to be reckoned with", "Is Quentin Tarantino backing out of Star Trek?", "The absolute biggest movies to look out for", "Studs split Magpie's shin 'six or eight inches completely open' in costly win over Swans", "Risk minimisation the key for Cricket Australia's domestic season as it looks to adapt to COVID-19", "Sydney Roosters add to St George Illawarra's woes with 24-16 NRL win", "Dan Butler kicks four goals as Saints pip Suns in AFL thriller, Magpies sneak home against Swans", "Mallee's premier horse race to run in 2020, keeping cup's 104-year history alive", "Rabbitohs confused, Dragons disappointed as both teams hit by coronavirus bans", "Dutch cyclist Jakobsen in medically induced coma after high-speed crash in Tour of Poland", "Canberra still 'a strong base' for ice hockey, 40 years on", "Hundreds of millions to be pumped into AIS to revitalise it as 'global centre of excellence'", "The art of the AFL stoppage and how it's shaped the Pies' results", "Demons pile more pain on Crows, Geelong makes light work of North Melbourne", "Wanderers' finals hopes hanging by a thread after 3-1 loss to Glory", "Fulham back in Premier League after extra-time playoff win", "Ireland stuns world champions England in third and final ODI", "'A decision I never wanted to take': Nadal joins growing list of stars opting out of US Open", "In a golden era of AFL ruckmen, it's time to rethink our ratings system", "'Mr Fix It' Mitchell Aubusson to join Sydney Roosters greats with 300th NRL appearance", "Richmond punishes wayward Brisbane Lions in comprehensive AFL victory", "NRL investigating alleged revenge porn video involving Brisbane Broncos player Kotoni Staggs", "Why netball's super shot is already changing the game", "Latrell Mitchell pleads guilty to firearms charge after lockdown camping trip ", "There's an awful lot to like about Nick Kyrgios 2.0", "Lewis Hamilton hailed for 'mind-blowing' three-wheeled win at British grand prix", "'We're keen to hear their views': Rockhampton unveils motorsport precinct plans", "Cameron Smith will be missed but Melbourne Storm will find a way to step up during his absence", "NN-REC/SPORT/MASTHEADS/NCAU-TOP-SPORT (192655)", "NC-NN-REC/NEWS.COM.AU HOME FINANCE MODULE (164822)", "NCA-REC/FINANCE/REALESTATECOMAU", "NC-NN-REC/NEWS.COM.AU TOP STORIES (174652)", "NC-NN-REC/NEWS Rec National and World (192348)", "INFECTIONS STABILISE: Victoria expected to record 451 new cases", "Viral AFL mum does it again", "More Woolies close over COVID concerns", "Vital lifeline for Aussie workers", "ESC-NN-REC/TRAVEL/HOMEPAGE (085853)", "'They were greedy': Cargo ship captain reveals the origin of chemical stockpile behind Beirut blast", "Lebanon detains 16 people over deadly Beirut blast as the country's leaders face rage", "More workers and businesses eligible for JobKeeper under new changes", "New York seeks to dissolve National Rifle Association in legal action over financial fraud", "European countries race to halt second wave as global coronavirus deaths top 700,000", "Australian universities investigating 'deeply concerning' hack of controversial exam software", "United States lifts coronavirus warning to avoid travel to Australia", "Victoria records 471 new coronavirus infections as cases in aged care balloon to 1,500", "The port of Beirut: the vital, historic centre of Lebanon's complex capital city", "First COVID-19 cases reported in Syria's Al-Hol camp", "Hong Kong foreign press club says journalists are facing &lsquo;unusual&rsquo; visa issues", "Coronavirus updates LIVE: Victorian arrivals to en…net to meet, Australia's death toll stands at 255", "Melbourne's hard lockdown ", "Tablet interactive: Coronavirus outbreak", "The latest illustrations from artist Cathy Wilcox ", "The latest illustrations from artist Matt Golding", "The latest illustrations from artist Simon Letch", "The latest illustrations from artist Andrew Dyson", "Best of cartoons, August 7, 2020", "'Tale of two halves': IAG reports 60% profit fall as weather, pandemic bite", "Naked City podcast: Inside maximum security", "Arsenal talisman Aubameyang on brink of new deal", "ASX slips ahead of SOMP; Iron ore, gold, $A on the rise", "REA Group suffers profit drop, flags Melbourne lockdown hit", "Day takes early lead at PGA Championship", "News Corp reports $US1.5b net loss, hit by writedowns, advertising slump", "Tips and race-by-race guide for Tamworth on Friday", "Four charged with murder one year after man's body found in caravan", "Trailing in election polls, Trump says rival Biden is 'against God'", "America should learn from Australia on China, says key US Congressman", "Breathing new life into Death in Brunswick, a classic 30 years young", "Boom or bust: The world's best-performing stock has Wall Street divided", "AFL set to investigate possibility metal studs caused Quaynor's gash", "Perth chiropractor found to have touched women inappropriately", "Big drop of bureaucracy splashes suburban corner wine store", "'Very serious charges': Perth teen accused of assaulting student with a disability", "Why markets don't seem to care if the economy stinks", "Police hunt for man who spat at shop worker in Doncaster", "8@eight: $A jumps to 18-month high; ASX set to slide lower", "Iranians, Russians texted reward offer for US election hacking info", "Rugby gets green light to return in South Africa", "After a sunny week, rain to hit Sydney just in time for weekend", "Wolves, Sevilla, Leverkusen into Europa League quarter-finals", "Working from home is leading to longer days and more meetings, global study finds"]
        }
    }
    
    getTitles() {
        // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

        // let tempArr = ["foo"]

        // console.log(this.props.feeds)

        // let map1 = this.props.feeds.map(( feedURL ) => {
            // return parser.parseURL( CORS_PROXY + feedURL, function(err, feed) {
            //     if (err) {
            //         console.error("FEED: ",feedURL);
            //         throw err;
            //     }
            //     feed.items.forEach(function(entry) {
            //         // console.log(entry.title);
            //         tempArr.push(entry.title);
            //     })
            // })
        // })

        // Promise.all(map1).then((values) => {
        //     console.log("tempArr ",tempArr)
        //     this.setState({
        //         data: tempArr
        //     })

        // })


    }

    componentDidMount() {
         this.getTitles();
    }

    render() {

        const titles = this.state.data.map((title)=> title)
        
        return(
            <div>
                {titles}
            </div>
        )
    }
        

        
        
    // }
    
    
};

export default FeedReader;