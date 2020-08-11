/**
 * Import the "get-sensor-readings" module, as well as the firebase admin module
 */
const getSensorReadings = require('./get-sensor-readings')
var admin = require('firebase-admin')
//const getCaptures = require('./send-whatsapp.js')


/**
 * Read the JSON key that was downloaded from firebase, in this case, it has
 * been placed in the "/home/pi" directory, and named "firebase-key.json"
 * You can change this to the location where your key is.
 *
 * Remember, this key should not be accessible by the public, and so should not
 * be kept inside the repository
 */
const serviceAccount = require('./firebase-key.json') //CAMBIAR

/**
 * The firebase admin SDK is initialized with the key and the project URL
 * Change the "databaseURL" to match that of your application.
 * Once the admin object is initialized, it will have access to all the
 * functionality that firebase provides, and can now write to the database
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://semillero-35a36.firebaseio.com',
  storageBucket: "gs://semillero-35a36.appspot.com" 
})


/**
 * Initialize the database, and create refs for the temperature
 * and humidity keys on our database. This is very similar to the refs we
 * created on the client side.
 */
const db = admin.database()
var bucket = admin.storage().bucket();
var sensores = admin.firestore();



const temperatureRef = db.ref('temperature')
const humidityRef = db.ref('humidity')
const humiditygroundRef = db.ref('humidityground')
const CO2Ref = db.ref('CO2')
const LDRRef = db.ref('LDR')
const pumpCurrentStateRef = db.ref('pumpCurrentState')
const lightCurrentStateRef = db.ref('lightCurrentState')
const ventilatorCurrentStateRef = db.ref('ventilatorCurrentState')
const humidifierCurrentStateRef = db.ref('humidifierCurrentState')
const waterLevelRef = db.ref('waterLevel')
const gasAlertRef = db.ref('gasAlert')
const Listener = db.ref('actuators')

/*function uploadsensors(){
  let data = {
    temperature: getSensorReadings.getTemperature(),
    humidityRef: getSensorReadings.getHumidity(),
    humidityground: getSensorReadings.getHumidityground(),
    CO2: getSensorReadings.getCo2(),
    LDR: getSensorReadings.getLDR(),
    PumpState: getSensorReadings.getPumpState(),
    VentilatorState: getSensorReadings.getVentilatorState(),
    LightState: getSensorReadings.getLightState(),
    HumidifierState: getSensorReadings.getHumidifierState(),
    WATERLEVEL: getSensorReadings.getWaterLevel(),
    GASALERT: getSensorReadings.getGasAlert(),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };
  let addDoc = sensores.collection('sensors').add(data).then(ref => {
    console.log('Added document with ID: ', ref.id);
  });
}; */


const cache = {
  ArduinoPump: 0,
  ArduinoVentilator: 0,
  ArduinoLights: 0,
  ArduinoHumidifier: 0,
  
}

Listener.on('value', function(snapshot) {
   cache.ArduinoPump= snapshot.val().pump;
   cache.ArduinoVentilator= snapshot.val().ventilator;
   cache.ArduinoLights= snapshot.val().lights;
   cache.ArduinoHumidifier= snapshot.val().humidifier;

   getSensorReadings.getPort().on("open", function(){
    getSensorReadings.getPort().write(`${cache.ArduinoPump},${cache.ArduinoLights},${cache.ArduinoVentilator},${cache.ArduinoHumidifier} \r\n`, function(err, res) {
     console.log("SENT");
      if (err) return console.log(err);
    });
  });
})

/**
 * Create a task that runs after a fixed interval of time
 *
 * Here, we have set the interval to be slightly longer than it was
 * before. This is to account for the delay that may occur in the network,
 * since we are not running the databas eon the local machine anymore.
 * If you find that the application is not communicating with firebase
 * as fast as you would like, try increasing this interval based on your
 * network speed.
 */
setInterval(() => {
  
    temperatureRef.set(getSensorReadings.getTemperature())
    humidityRef.set(getSensorReadings.getHumidity())
    humiditygroundRef.set(getSensorReadings.getHumidityground())
    CO2Ref.set(getSensorReadings.getCo2())
    LDRRef.set(getSensorReadings.getLDR())
    pumpCurrentStateRef.set(getSensorReadings.getPumpState())
    ventilatorCurrentStateRef.set(getSensorReadings.getVentilatorState())
    lightCurrentStateRef.set(getSensorReadings.getLightsState())
    humidifierCurrentStateRef.set(getSensorReadings.getHumidifierState())
    waterLevelRef.set(getSensorReadings.getWaterLevel())
    gasAlertRef.set(getSensorReadings.getGasAlert())
   // if(getSensorReadings.getPumpState()== 'H'){
    //  getCaptures.sendmessage(); 
    //}
  /*  bucket.upload('/home/pi/book/output/semillero.jpg', { destination: "semillero.jpg" }, (err, file) => {
      if (err) {
         return console.error(err); }
      }) */
   // uploadsensors();
      
}, 5000) //108000000

