import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyBYvbI7J1A3qSBQ0Rrlg_Btbc7NXQNTIFE',
  authDomain: 'rideandshare-8fa88.firebaseapp.com',
  projectId: 'rideandshare-8fa88',
  storageBucket: 'rideandshare-8fa88.appspot.com',
  messagingSenderId: '96584108097',
  appId: '1:96584108097:web:167aa4f7431c971fa41ec0',
  measurementId: 'G-X2VT47FX24',
  databaseURL: 'https://rideandshare-8fa88-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
