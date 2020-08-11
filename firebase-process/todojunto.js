const Serialport = require('serialport');
const Readline= Serialport.parsers.Readline;
var admin = require('firebase-admin')
const port = new Serialport('COM3',{
    baudRate: 9600
});
const parser = port.pipe (new Readline({ delimeter: '\r\n', encoding : 'utf8' }));
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



parser.on('open', function() {
  console.log('connection is opened');
});
const cache = {
  temperature: 0,
  humidityair: 0,
  humidityground: 0,
  Co2: 0,
  LDR: 0,
  pump:0,
  ventilator:0,
  lights:0,
  humidifier:0,
  gasAlert:0,
  waterLevel:0,
}

const Arduino = {
    ArduinoPump: 0,
    ArduinoVentilator: 0,
    ArduinoLights: 0,
    ArduinoHumidifier: 0,
    
  }
  
  Listener.on('value', function(snapshot) {
     Arduino.ArduinoPump= snapshot.val().pump;
     Arduino.ArduinoVentilator= snapshot.val().ventilator;
     Arduino.ArduinoLights= snapshot.val().lights;
     Arduino.ArduinoHumidifier= snapshot.val().humidifier;
     console.log(Arduino.ArduinoPump);
  
     port.on("open", function(){
      port.write(`${Arduino.ArduinoPump},${Arduino.ArduinoLights},${Arduino.ArduinoVentilator},${Arduino.ArduinoHumidifier} \r\n`, function(err, res) {
       console.log("SENT");
        if (err) return console.log(err);
      });
    });
  })
  


parser.on('data', function(data){
      // Split the numbers based on a comma delimeter into an array 
  const values = data .  split ( ',' ) ; 
  // Make sure we have the number of values we expect 
  if ( values . length === 11 ) 
  { 
  // Get data 

        cache.humidityair = values [ 0 ] ; 
        cache.temperature = values [ 1 ] ; 
        cache.humidityground = values [ 2 ] ; 
        cache.Co2 = values [ 3 ] ; 
        cache.LDR= values [ 4 ] ; 
        cache.pump= values [ 5 ] ; 
        cache.ventilator= values [ 6 ] ;
        cache.lights= values [ 7 ] ;
        cache.humidifier= values [ 8 ] ;
        cache.gasAlert= values [ 9 ] ;
        cache.waterLevel= values [ 10 ] ;
  // Do something... 
//  console .  log ( `AIR: ${ cache.humidityair } , TEMPERATURE: ${ cache.temperature }, GROUND: ${ cache.humidityground  } , LDR: ${ cache.LDR } , CO2: ${ cache.Co2 }, PUMP: ${ cache.pump },
  //VENTILATOR: ${ cache.ventilator },LIGHTS: ${ cache.lights },HUMIDIFIER: ${ cache.humidifier },GAS: ${ cache.gasAlert},WATERLEVEL: ${ cache.waterLevel }` ) ; 
  } 
  else 
  { 
  // Not the right number of values - panic! 
 // console .  warn ( "Panic!" ) 
  }  
   
});

parser.on('error', function(err){
  console.log('err');
});

setInterval(() => {
  
    temperatureRef.set(cache.temperature)
    humidityRef.set(cache.humidityair)
    humiditygroundRef.set(cache.humidityground)
    CO2Ref.set(cache.Co2)
    LDRRef.set(cache.LDR)
    pumpCurrentStateRef.set(cache.pump)
    ventilatorCurrentStateRef.set(cache.ventilator)
    lightCurrentStateRef.set(cache.lights)
    humidifierCurrentStateRef.set(cache.humidifier)
    waterLevelRef.set(cache.gasAlert)
    gasAlertRef.set(cache.waterLevel)
   // if(getSensorReadings.getPumpState()== 'H'){
    //  getCaptures.sendmessage(); 
    //}
  /*  bucket.upload('/home/pi/book/output/semillero.jpg', { destination: "semillero.jpg" }, (err, file) => {
      if (err) {
         return console.error(err); }
      }) */
   // uploadsensors();
      
}, 5000) //108000000