import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, getDoc, setDoc, collection, doc } from 'firebase/firestore';

var config = {
    /* your config data */
};
const app = initializeApp(config);

const auth = getAuth();
auth.languageCode = "ja";
const db = getFirestore(app);

const signin_button = document.getElementById('signin-button');
const signout_button = document.getElementById('signout-button');
const user_data_log = document.getElementById('user_data');

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
            signInWithCredential(auth, credential).catch(error => {
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
        user_data_log.textContent = JSON.stringify(user);
        const user_data = await getDoc(doc(db, 'users', uid));
        if (!(user_data.exists())) {
            await setDoc(doc(collection(db, 'users'), uid), {
                name: displayName,
                mail: email,
                photo: photoURL,
                id: uid
            });
        }
    } else {
        signin_button.style.display = "block";
        signout_button.style.display = "none";
        user_data.textContent = '';
    }
});
signin_button.addEventListener('click', SignIn, false);
signout_button.addEventListener('click', SiginOut);
