// Import the functions you need from the SDKs you need
import {initializeApp, getApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = { 
    apiKey: "AIzaSyAIxn45jYJYdQdk8BTS87inoOgnD_OxiFE", 
    authDomain: "react-mini-project-d61a8.firebaseapp.com", 
    projectId: "react-mini-project-d61a8",
    storageBucket: "react-mini-project-d61a8.appspot.com", 
    messagingSenderId: "113134415770", 
    appId: "1:113134415770:web:328d43fb037214061fd423", 
    measurementId: "G-WDP9STTVE5" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase의 인스턴스를 상수에 저장
const db = getFirestore(app);
const apiKey = firebaseConfig.apiKey
const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://react-mini-project-d61a8.appspot.com");

export {db, apiKey, storage};