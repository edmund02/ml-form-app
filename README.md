<br />
<p align="center">
   <!-- <img src="assets/icon.png" alt="Logo" width="80" height="80"> -->

  <h1 align="center">Form Builder App</h1>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
      <li>
         <a href="#introduction">Introduction</a>
         <ul>
            <li><a href="#built-with">Built With</a></li>
            <li><a href="#important-directory">Important Directory</a></li>
         </ul>
      </li>
      <li><a href="#tools-version">Tools version</a></li>
      <li><a href="#run-the-project">Run the project</a></li>
  </ol>
</details>

## Introduction

This is my very first React Native project (previously have ReactJS experience only). I have learnt and explored the difference between ReactJS and React Native such as ReactJS uses [React Router](https://reactrouter.com/web/guides/quick-start) to navigate from page to page while React Native uses [React Navigation](https://reactnavigation.org/).

This React Native application is **only** tested on android (my phone only basically). It is not tested on any other devices such as tablet and iOS or even other android device.

Besides, I am using [Expo](https://expo.io/) to run the project. It is extremely easy to set up and run the project with Expo.

### Built With

- React
- React Native
- React Native Paper (Material Design)
- React Navigation
- Redux
- Expo

## Important Directory
Only showing important directory

```
ml-form-app
│   README.md  
│   App.js  // root file, define theme and initiate store & reducer
│
└───actions // actions that update reducers' state
│   │   index.js
│   
└───app  // UI 
│    │   App.js // tab navigator
│    │
│    └───components  // UI component
│    │
│    └───Page  // main pages UI
│
└───constants   // hardcoded variable
│
└───helper  // function to be reused
│
└───reducers
│
└───store
```

## Tools version

- node v12.16.3
- yarn v1.22.4 (should work with npm as well)

## Run the project

1. Install expo globally.

   ```
   yarn global add expo
   ```

2. Install all the required packages.

   ```
   yarn
   ```

3. While waiting for the installation process to complete, download the necessary Expo Go app on your mobile:-

   - <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US" target='_blank'>Google Play Store</a>
   - <a href="https://apps.apple.com/us/app/expo-go/id982107779" target='_blank'>Apple App Store</a>

4. Once the package installation is complete, start the application in development environment.

   ```
   yarn start
   ```

   This will start the application with Expo

5. Open up your Expo Go app on your mobile, press 'Scan QR Code' to scan the QR on the Expo developer tools UI on your browser. You may press `r` on the terminal/cmd (wherever you run the project) to reload the app if you are facing any issue. You may switch the QR for:-

   - Tunnel: Connect from everywhere
   - LAN: Connect with the same WIFI
   - Local: Connect on local device

6. Start playing around!
