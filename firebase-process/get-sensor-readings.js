const Serialport = require('serialport');
const Readline= Serialport.parsers.Readline;
const port = new Serialport('COM3',{
    baudRate: 9600
});
const parser = port.pipe (new Readline({ delimeter: '\r\n', encoding : 'utf8' }));


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
  console .  log ( `AIR: ${ cache.humidityair } , TEMPERATURE: ${ cache.temperature }, GROUND: ${ cache.humidityground  } , LDR: ${ cache.LDR } , CO2: ${ cache.Co2 }, PUMP: ${ cache.pump },
  VENTILATOR: ${ cache.ventilator },LIGHTS: ${ cache.lights },HUMIDIFIER: ${ cache.humidifier },GAS: ${ cache.gasAlert},WATERLEVEL: ${ cache.waterLevel }` ) ; 
  } 
  else 
  { 
  // Not the right number of values - panic! 
  console .  warn ( "Panic!" ) 
  }  
   
});

parser.on('error', function(err){
  console.log('err');
});


module.exports.getTemperature = () => cache.temperature
module.exports.getHumidity = () => cache.humidityair
module.exports.getHumidityground = () => cache.humidityground
module.exports.getCo2 = () => cache.Co2
module.exports.getLDR = () => cache.LDR
module.exports.getPumpState = () => cache.pump
module.exports.getVentilatorState = () => cache.ventilator
module.exports.getLightsState = () => cache.lights
module.exports.getHumidifierState = () => cache.humidifier
module.exports.getGasAlert = () => cache.gasAlert
module.exports.getWaterLevel = () => cache.waterLevel
module.exports.getPort = () => port
