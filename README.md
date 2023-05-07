This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn dev or npm run dev`

Run the application in development mode with development environment variables.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build:prod or npm run build:prod`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn deploy-firebase or npm run deploy-firebase`

Before carrying out the deploy in firebase you must follow the following steps:
**Remember before you have created a Firebase account and an empty project.**

1. Install firebase tools,
```bash
npm i -g firebase-tools
``` 
This is done in order to install firebase-cli.
2. Logging in firebase, to log in type in a console, preferably with the root path of the project, the following command, 

```bash
firebase login
```
3. Perform the deploy, in a space where the root is the root of the project write,
```bash
yarn deploy-firebase or npm run deploy-firebase
``` 
Several ckeck will come out that must be done as follows:

##### a. Are you ready to proceed? In this option we will give 'y'
##### b. We choose the Hosting option: Configure and deploy Firebase Hosting sites, pressing the space key and then the enter key
##### c. We select 'Use an existing project' to choose the blank project that we had previously created in the firebase.
##### d. We put the name of the folder for the Output in that case it would be 'build', we hope in the console the address of the displayed page will be shown.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
