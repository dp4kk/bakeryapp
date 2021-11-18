import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBDCUHhFuq4AWMVOUIZqLENh2bn3dNX3m4",
  authDomain: "react-ecommerce-d271a.firebaseapp.com",
  projectId: "react-ecommerce-d271a",
  storageBucket: "react-ecommerce-d271a.appspot.com",
  messagingSenderId: "796038111057",
  appId: "1:796038111057:web:af6df481518f3eb588fd70",
};

const app=firebase.initializeApp(firebaseConfig)
export const auth=app.auth()
export default app