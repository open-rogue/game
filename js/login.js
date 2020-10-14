var uid = null;

function validateGoogleAccount() {
    // Firebase
	var firebaseConfig = {
		apiKey: "AIzaSyAmxjDLZrtiWjQGkekCdTXKx5zCbLDJP28",
		authDomain: "machin-dev.firebaseapp.com",
		databaseURL: "https://machin-dev.firebaseio.com",
		projectId: "machin-dev",
		storageBucket: "machin-dev.appspot.com",
		messagingSenderId: "471389656934",
		appId: "1:471389656934:web:de807290048ad37fa91aa7",
		measurementId: "G-2LDMEXJL3N"
	};
	// Initialize Firebase
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
    }
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        uid = result.user.uid;
        var ref = database.ref('mmo/players');
        ref.on('value', gotPlayerData, errPlayerData);
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function gotPlayerData(data) {
    players = data.val();
    if (uid in players) {
        var session_key = data.val()[uid].session;
        window.location.href = `/layout.html?uid=${uid}&s=${session_key}`;
    } else {
        registerAccount();
    }
}

function errPlayerData(error) {

}

function registerAccount() {
    div = document.getElementById("form");
    div.innerHTML = `
        <h1>Create new player</h1>
        <input id = "user-input" onclick="userInputClick()" value = "Enter your username..."/>
        <a onclick="submitRegistration()" class="continue">Continue</a>
    `;
}

function submitRegistration() {
    var username = document.getElementById("user-input").value;
    if (username != "") {
        window.location.href = `/layout.html?uid=${uid}&n=${username}`;
    }
}

function userInputClick() {
    document.getElementById("user-input").value = "";
    document.getElementById("user-input").style.color = "#000000";
}