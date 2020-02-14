import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDOprrxYSJoXvmtlXHIx7PjB4Q5I3D6ewI",
    authDomain: "fir-vue-7829d.firebaseapp.com",
    databaseURL: "https://fir-vue-7829d.firebaseio.com",
    projectId: "fir-vue-7829d",
    storageBucket: "fir-vue-7829d.appspot.com",
    messagingSenderId: "740197278742",
    appId: "1:740197278742:web:483781ab6f8c6ef35f8137"
  };

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })