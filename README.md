# Return of Reckoning (RoR) Career Builder

Repository for the RoR Career Builder web app. An online resource for players of the independently run reboot of Warhammer: Age of Reckoning, now known as [Return of Reckoning](https://www.returnofreckoning.com/).

The app is primarily built with [React](https://facebook.github.io/react/) using ES6 syntax (compiled via [Babel](https://babeljs.io)). [Webpack](https://webpack.github.io) is used to build the dev server and production files (instructions below). The JavaScript is linted using [ESLint](http://eslint.org/) with a slightly modified [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) config.

Alongside the JavaScript source files sit the CSS source files. [CSS Modules](https://github.com/css-modules/css-modules) have been used in combination with regular [PostCSS](http://postcss.org) utility classes. All CSS is compiled by Webpack (inline for development and into an external CSS file for production).

Other assets utilised are:

- [PureCSS](http://purecss.io/) for responsive grid
- [Iconic](https://useiconic.com/open) for icons
- [Roboto Google web font](https://www.google.com/fonts/specimen/Roboto)

You can see the the RoR Career Builder in action at: [http://ror.builders](http://ror.builders)

## Instructions

- Clone the repository to a destination of your choice.
- At the destination folder, install the assets using npm:

```
npm install
```

- To run a local dev server, with Hot Module Reloading (HMR), at **http://localhost:3000** run:

```
npm start
```

- To create a production ready version of the app (in **/build** directory) run:

```
npm run build
```

**Note:** When creating production ready version, remember to populate `analytics.js` with real Google Analytics configuration.
