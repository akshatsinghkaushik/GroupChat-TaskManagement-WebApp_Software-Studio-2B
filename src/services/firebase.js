import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyADjSvD59x-xPFvLQOlfBJQ0HyPrh9O_Hc",
  authDomain: "ses2b-group2.firebaseapp.com",
  databaseURL: "https://ses2b-group2.firebaseio.com",
  storageBucket: "ses2b-group2.appspot.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();
