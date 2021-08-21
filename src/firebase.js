import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD891gVZnjU4LZAnr2wjoVEa0rRgA04S1w",
    authDomain: "netflix-clone-6580a.firebaseapp.com",
    projectId: "netflix-clone-6580a",
    storageBucket: "netflix-clone-6580a.appspot.com",
    messagingSenderId: "569255114748",
    appId: "1:569255114748:web:ca45fb086ae9fd84f12479"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export {auth}
  export default db 