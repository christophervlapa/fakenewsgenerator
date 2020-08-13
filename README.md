# FakeNews

This artwork takes 42 RSS news feeds from Australia, pulls down the titles of each story from each feed, breaks the stories into individual words and re-generates the same number of stories but from randomly combined words. Loosely based on the cut-ups of the Dadaists and William S. Burroughs:

https://en.wikipedia.org/wiki/Cut-up_technique

# Technology used

Extensive ES6 building out the NodeJS server.js file that agregates the feeds and publishes the JSON of all titles. Also using modern NodeJS stuff like Filesystem Promises.

Front end built with AngularJS 10 along with ES6 and SCSS using Flexbox and Grid to produce the news-like layout.

## Development server

1. Run `node server.js` and allow it to take it's time to pull the feeds. Wait for the JSON server to run, then:
2. In a new tab `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# N/A the following is for dev use only!

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
