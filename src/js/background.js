import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

var config = {
    apiKey: "AIzaSyCoR1FGtRhfHG_IeYvZKgYJdRhxfEqiOdc",
    authDomain: "cewf-id.firebaseapp.com",
    projectId: "cewf-id",
    storageBucket: "cewf-id.appspot.com",
    messagingSenderId: "399762600225",
    appId: "1:399762600225:web:9b21abc20016f5f2280e60"
};
initializeApp(config);

const auth = getAuth()

function initApp() {
	auth.onAuthStateChanged(function (user) {
		console.log('User state change detected from the Background script of the Chrome Extension:', user);
	});
}

chrome.action.onClicked.addListener(function () {
	initApp();
});
