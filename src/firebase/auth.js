import { auth } from './firebase';

// Sign up
export const doCreateUserWithEmailPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
}
//Sign in
export const doSignInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

//Sign out
export const doSignOut = () => auth.signOut();

//Password Reset
export const doPasswordReset = email => {
  return auth.sendPasswordResetEmail(email);
}

//Password Change
export const doPasswordUpdate = password => {
  return auth.currentUser.updatePassword(password);
}
