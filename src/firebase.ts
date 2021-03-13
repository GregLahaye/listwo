import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4X74s8FyxG1Eps4C50YLrY8TMrTB-53c",
  authDomain: "listwo-2988a.firebaseapp.com",
  databaseURL: "https://listwo-2988a-default-rtdb.firebaseio.com",
  projectId: "listwo-2988a",
  storageBucket: "listwo-2988a.appspot.com",
  messagingSenderId: "986666016470",
  appId: "1:986666016470:web:7af2f8fee08413a459b377",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database;

export const signIn = async () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);

    /** @type {firebase.auth.OAuthCredential} */
    var credential: any = result.credential as any;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  }
};
