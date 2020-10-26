import * as firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyClkhLxN-42Gvh4ckFVHS5dd9M5cNOZqSo",
  authDomain: "sinapsisuao.firebaseapp.com",
  databaseURL: "https://sinapsisuao.firebaseio.com",
  projectId: "sinapsisuao",
  storageBucket: "sinapsisuao.appspot.com",
  messagingSenderId: "277479708358",
  appId: "1:277479708358:web:2eb549bab5dd42c08ba9c7",
  measurementId: "G-Y8Q5BVVVLD",
});

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const database = firebaseConfig.firestore();

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGoogle = () => {
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(GoogleProvider);
};

export default firebaseConfig;
