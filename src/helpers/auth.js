import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      auth().currentUser.sendEmailVerification();
    });
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function updatepass(newPassword) {
  return auth().currentuser().updatePassword(newPassword);
}

export function forgotpass(emailAddress) {
  return auth()
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      // Email sent.
      console.log("Email Sent");
    })
    .catch(function (error) {
      // An error happened.
    });
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}

export function logout() {
  return auth().signOut();
}
