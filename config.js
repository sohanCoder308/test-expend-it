import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyBUi-Id_FDCnLGcPrwnHR1IjQs77pMblok",
  authDomain: "expentodo.firebaseapp.com",
  databaseURL: "https://expentodo-default-rtdb.firebaseio.com",
  projectId: "expentodo",
  storageBucket: "expentodo.appspot.com",
  messagingSenderId: "356274037827",
  appId: "1:356274037827:web:47b822ca5a61eb327ba0f6",
  measurementId: "G-KYS538F7BC"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
