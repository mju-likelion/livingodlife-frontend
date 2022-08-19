import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY3p0dITRAqh-ltMKtpqSjNW8Ekk7JRRw",
  authDomain: "livingodlife-7b910.firebaseapp.com",
  projectId: "livingodlife-7b910",
  storageBucket: "livingodlife-7b910.appspot.com",
  messagingSenderId: "464632988334",
  appId: "1:464632988334:web:6b743c5c5a04aa01d7633f",
  measurementId: "G-6WE958JG3L",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const analytics = getAnalytics(firebaseApp);
export const messaging = getMessaging(firebaseApp);

const messagingToken = getToken(messaging, {
  vapidKey:
    "BPDZv6AFbDwhSpWAXVC35OZzqLmfO4r76HPBaI-DeBx4NhvW2K9q68DAFWMVLfXJeWTCBfQM2BeoPbqLweb4Ky4",
});

messagingToken.then((token) => {
  console.log(token);
});
