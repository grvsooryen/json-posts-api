# Typicode Posts

This react app is designed as a task for 18F take-home tests.
The app uses APIs from http://jsonplaceholder.typicode.com/ to populate the UI. Search functionality is to filter the posts fetched from API.
Autocomplete is enabled for the search input using the datalist technique. Furthermore, pagination is enabled on the site to improve the visibility
of all the posts fetched from the API. The site has the following features:

- Pagination of 100 entries
- Responsive Design
- Autocomplete for Posts
- View the individual Article via read more
- Editing of body and title of posts

## Tech Stack
Following technologies have been used to build up this repository:

- JavaScript Library - React
- Router - React Router
- State Management - Redux
- Async Middleware - Redux SAGA
- UI Framework - Material UI
- Unit Testing - Jest

## Setup
In the project directory, you can run:

```sh
npm install
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Testing

```sh
npm test
```

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Current Coverage: 
File                    |  % Stmts | % Branch |  % Funcs |  % Lines |
------------------------|----------|----------|----------|----------|
All files               |    93.28 |    82.14 |    91.36 |    92.83 |

## Building
```sh
yarn build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Deployment
Just push the latest code to master and the site will be deployed on netlify

Hosted Site: https://suspicious-fermat-bb5547.netlify.app/