var config = {
  apiKey: "AIzaSyBrXJZqFFNoKwfM1Lre4nSVR-cbLj60RpQ",
  authDomain: "cegl-id.firebaseapp.com",
  projectId: "cegl-id",
  storageBucket: "cegl-id.appspot.com",
  messagingSenderId: "952282702012",
  appId: "1:952282702012:web:67946b673bdb189e8db0b9"
};
firebase.initializeApp(config);

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

chrome.browserAction.onClicked.addListener(function () {
  initApp();
});
