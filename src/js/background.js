import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

var config = {
	/* your config data */
};
initializeApp(config);

const auth = getAuth()

function initApp() {
	auth.onAuthStateChanged(function (user) {
		console.log('User state change detected from the Background script of the Chrome Extension:', user);
	});
}

chrome.browserAction.onClicked.addListener(function () {
	initApp();
});
