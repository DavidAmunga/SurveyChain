import firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBx8HHBX9OEfv7vy81271-YqEJvGSkTzyE",
    authDomain: "nyumbakumi-01.firebaseapp.com",
    databaseURL: "https://nyumbakumi-01.firebaseio.com",
    projectId: "nyumbakumi-01",
    storageBucket: "nyumbakumi-01.appspot.com",
    messagingSenderId: "195212724297"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);


export default firebase;