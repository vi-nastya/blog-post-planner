import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyASa0gIL1_Sd_amsJvRpIATzuur-WKTr38",
  authDomain: "instatext-app.firebaseapp.com",
  databaseURL: "https://instatext-app.firebaseio.com",
  projectId: "instatext-app",
  storageBucket: "instatext-app.appspot.com",
  messagingSenderId: "1064459423131"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
