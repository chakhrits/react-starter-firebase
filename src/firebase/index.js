import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAAJ2jiozS0K0xPABNw1pY4CEMBqeeJHns',
  authDomain: 'test-react-web.firebaseapp.com',
  databaseURL: 'https://test-react-web.firebaseio.com',
  projectId: 'test-react-web',
  storageBucket: 'test-react-web.appspot.com',
  messagingSenderId: '624423692000',
  appId: '1:624423692000:web:702844879cca5578a95285',
  measurementId: 'G-HMZMZV8867'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
firebase.auth()

export default firebase
