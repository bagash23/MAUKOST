import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD0CAjjjV30z7ZxfyrTwpNLJHL9IBwYEnE",
    authDomain: "maukost-3e05a.firebaseapp.com",
    projectId: "maukost-3e05a",
    storageBucket: "maukost-3e05a.appspot.com",
    messagingSenderId: "537211218040",
    appId: "1:537211218040:web:6091829bac856f4053658d"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(email, password) {    
    return await createUserWithEmailAndPassword(auth, email, password);
}

