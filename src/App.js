import React from 'react';
// import { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import FeedReader from './feed-reader';
import { auFeeds } from './feeds/au_rss_news_feeds.json';

function App() {

  return (
      <div className="App">
        <header className="App-header">
          <h1>FAKE NEWS</h1>
        </header>
        <main>
          <FeedReader feeds={auFeeds}></FeedReader>
        </main>
      </div>
  );
}

export default App;
