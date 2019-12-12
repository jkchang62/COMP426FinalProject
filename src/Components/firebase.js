import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';


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
        this.autho = app.auth(); 
        this.state = {commentImageURL:null,
                    currentImageComments:null,
                    currentImageID: null};
    }

    CreateUser = (email,password) => this.autho.createUserWithEmailAndPassword(email,password);
    
    SignInUser = (email,password) => this.autho.signInWithEmailAndPassword(email,password);
    
    SignOutUser = () => this.autho.signOut();
    
    UserPasswordReset = email => this.autho.sendPasswordResetEmail(email);
    
    UserPasswordUpdate = password => this.autho.currentUser.updatePassword(password);

    StateChange = () => this.autho.onAuthStateChanged((user) => {if(user){console.log('helloWOrld')}});

    DeleteUser = () => this.autho.currentUser.delete().then(function(){
      var db = firebase.firestore();
      var usersRef = db.collection("users");
      usersRef.doc(window.localStorage.uid).delete();
    });

}

export default Firebase;