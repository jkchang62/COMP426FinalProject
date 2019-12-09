import app from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAGdsICNfWLay9Wbg-bYbRip_NoJN1Iw34",
    authDomain: "artpiece-compare.firebaseapp.com",
    databaseURL: "https://artpiece-compare.firebaseio.com",
    projectId: "artpiece-compare",
    storageBucket: "artpiece-compare.appspot.com",
    messagingSenderId: "839370229979",
    appId: "1:839370229979:web:d5c2e8ec2e884424b4e4fe",
    measurementId: "G-Y6VWVTT1XJ"
  };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth(); 
    }

    CreateUser = (email,password) => this.auth.createUserWithEmailAndPassword(email,password);
    
    SignInUser = (email,password) => this.auth.signInWithEmailAndPassword(email,password);
    
    SignOutUser = () => this.auth.signOut();
    
    UserPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    UserPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

}

export default Firebase; 
