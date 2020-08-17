/**
 * Import the "get-sensor-readings" module, as well as the firebase admin module
 */
const getSensorReadings = require('./get-sensor-readings')
var admin = require('firebase-admin')



/**
 * Read the JSON key that was downloaded from firebase, in this case, it has
 * been placed in this directory, and named "firebase-key.json"
 *However, I deleted this file here because of condfidential data and security
 */
const serviceAccount = require('./firebase-key.json') //CAMBIAR

/**
 * The firebase admin SDK is initialized with the key and the project URL
 * Once the admin object is initialized, it will have access to all the
 * functionality that firebase provides, and can now write to the database
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://semillero-35a36.firebaseio.com',
  storageBucket: "gs://semillero-35a36.appspot.com" 
})


/**
 * Initialize the database, and create refs for all the datas keys on our database.
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
//const Listener = db.ref('actuators')

function uploadsensorsFirestore(){
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
   sensores.collection('sensors').add(data).then(ref => {
    console.log('Added document to Firestore with ID: ', ref.id);
  });
};


/*const cache = {
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
*/
/**
 * Create a task that runs after a fixed interval of time
 * FOR REALTIME
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
    bucket.upload('/home/pi/webcam/photos/$DATE.jpg', { destination: "semillero.jpg" }, (err, file) => {
      if (err) {
         return console.error(err); }
      }) 
   uploadsensorsFirestore();
      
}, 5000) 

/**
 * FOR FIRESTORE EVERY HOUR
 */
setInterval(() => { 
 uploadsensorsFirestore();
    
},3600000)


