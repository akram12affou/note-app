import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDkuJp2GGDFtc9WxHeKK5JLKOmItr6o1hA",
  authDomain: "todo-45a9a.firebaseapp.com",
  databaseURL: "https://todo-45a9a-default-rtdb.firebaseio.com",
  projectId: "todo-45a9a",
  storageBucket: "todo-45a9a.appspot.com",
  messagingSenderId: "199808301823",
  appId: "1:199808301823:web:786096736675f2e2576aca",
  measurementId: "G-YB07EJ1T46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth(app);
export default db;
