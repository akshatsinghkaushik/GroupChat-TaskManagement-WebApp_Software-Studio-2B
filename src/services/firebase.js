import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyADjSvD59x-xPFvLQOlfBJQ0HyPrh9O_Hc",
  authDomain: "ses2b-group2.firebaseapp.com",
  databaseURL: "https://ses2b-group2.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
