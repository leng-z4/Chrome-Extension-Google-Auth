import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

var config = {
    apiKey: "AIzaSyBrXJZqFFNoKwfM1Lre4nSVR-cbLj60RpQ",
    authDomain: "cegl-id.firebaseapp.com",
    projectId: "cegl-id",
    storageBucket: "cegl-id.appspot.com",
    messagingSenderId: "952282702012",
    appId: "1:952282702012:web:67946b673bdb189e8db0b9"
};
initializeApp(config);

const auth = getAuth();
auth.languageCode = "ja";
const db = getFirestore();
const provider = new GoogleAuthProvider();

const signin_button = document.getElementById('signin-button');
const signout_button = document.getElementById('signout-button');
const user_data = document.getElementById('user_data');

function SignIn() {
    startAuth(true);
    signin_button.style.display = "none";
    signout_button.style.display = "block";
}

function SiginOut() {
    if (auth.currentUser) {
        auth.signOut();
        signin_button.style.display = "block";
        signout_button.style.display = "none";
        user_data.textContent = ''
    }
}

function startAuth(interactive) {
    chrome.identity.getAuthToken({ interactive: !!interactive }, function (token) {
        if (chrome.runtime.lastError && !interactive) {
            console.log('It was not possible to get a token programmatically.');
        } else if (chrome.runtime.lastError) {
            console.error(JSON.stringify(chrome.runtime.lastError));
        } else if (token) {
            var credential = GoogleAuthProvider.credential(null, token);
            signInWithCredential(auth, credential)
                .then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                    if (error.code === 'auth/invalid-credential') {
                        chrome.identity.removeCachedAuthToken({ token: token }, function () {
                            startAuth(interactive);
                        });
                    }
                });
        } else {
            console.error('The OAuth Token was null');
        }
    });
}

auth.onAuthStateChanged(async function (user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var photoURL = user.photoURL;
        var uid = user.uid;
        signin_button.style.display = "none";
        signout_button.style.display = "block";
        user_data.textContent = JSON.stringify(user);
        const user_data = await db.collection("users").doc(uid).get();
        if (!user_data.exists) {
            user_data.set({
                name: displayName,
                photo: photoURL,
                id: uld
            }, {merge:true});
        }
    } else {
        console.log("w");
        signin_button.style.display = "block";
        signout_button.style.display = "none";
        user_data.textContent = '';
    }
});
signin_button.addEventListener('click', SignIn, false);
signout_button.addEventListener('click', SiginOut);
