var uid = null;
var otp = null;

function validateDiscordUser() {
    const urlParams = new URLSearchParams(window.location.search);
    uid = urlParams.get('uid');
    otp = urlParams.get('otp');
    console.log("UID", uid);
    console.log("OTP", otp);
    // Firebase
    requirejs.config({
        paths: {
            text: "/js/require/text",
            json: "/js/require/json"
        }
    });
    console.log("Attempting to load config")
    require(['json!firebase_config.json'], function (firebaseConfig) {
        console.log("Loaded firebase config")
        // Initialize Firebase
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
            database = firebase.database();
        }
        var ref = database.ref('mmo/players');
        ref.on('value', gotPlayerData, errPlayerData);
    });
}

function gotPlayerData(data) {
    players = data.val();
    if (uid in players) {
        if (true) {// (players[uid].otp == otp) {
            window.location.href = `/layout.html?uid=${uid}&otp=${otp}`;
        } else {
            console.log("Invalid OTP")
        }
        
      //window.location.href = `/layout.html?uid=${uid}&s=${session_key}`;
    } else {
        console.log(`No UID ${uid} found in database.`)
        //registerAccount();
    }
}

function errPlayerData(error) {

}