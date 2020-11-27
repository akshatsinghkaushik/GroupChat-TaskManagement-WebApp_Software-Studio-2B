import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCV6XKmMUDv9PR5MGPIYIRoneeKk1JFqyQ",
  authDomain: "groupchat-4f7a9.firebaseapp.com",
  databaseURL: "https://groupchat-4f7a9.firebaseio.com",
  projectId: "groupchat-4f7a9",
  storageBucket: "groupchat-4f7a9.appspot.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();
