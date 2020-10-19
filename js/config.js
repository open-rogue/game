function gotConfigData(data) {
    var config = data.val();
    // Set weather
	weather.set(config.weather);
}

function errConfigData(err) {

}

function setConfig(key, value) {
    var ref = database.ref('mmo/config');
    ref.child(key).set(value);
}