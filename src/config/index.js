import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCAE0jOBXjV-724o_LrA5HeW5B14at5rdQ",
    authDomain: "maukost-63eed.firebaseapp.com",
    projectId: "maukost-63eed",
    storageBucket: "maukost-63eed.appspot.com",
    messagingSenderId: "1041397196157",
    appId: "1:1041397196157:web:39bec2f25760eb52fbd814"
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

