import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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

export const authenticate = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await firebase.auth().signInWithPopup(provider);

  const credential = result.credential as firebase.auth.OAuthCredential;

  const token = credential.accessToken;

  const user = result.user;

  return { user, token };
};
