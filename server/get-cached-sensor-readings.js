const Serialport = require('serialport');
const Readline= Serialport.parsers.Readline;
const databaseOperations = require('./database-operations')
const {notify} = require('./notifier')
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

}


parser.on('data', function(data){
      // Split the numbers based on a comma delimeter into an array 
  const values = data .  split ( ',' ) ; 
  // Make sure we have the number of values we expect 
  if ( values . length === 5 ) 
  { 
  // Get data 
 
  databaseOperations.insertReading('temperature', values [ 1 ])
  databaseOperations.insertReading('humidity', values [ 0 ])
  databaseOperations.insertReading('humidityground', values [ 2 ])
  databaseOperations.insertReading('CO2', values [ 3 ])
  databaseOperations.insertReading('LDR', values [4])
  // notify if a value has change

        if (cache.temperature !== values [ 1 ]) {
          notify(values [ 1 ], 'temperature')
        }
        if (cache.humidity !== values [ 0 ]) {
          notify(values [ 0 ], 'humidity')
        }
        if (cache.humidityground !== values [ 2 ]) {
          notify(values [ 2 ], 'humidityground')
        }
        if (cache.Co2 !== values [ 3 ]) {
          notify(values [ 3 ], 'CO2')
        }
        if (cache.LDR !== values [4]) {
          notify(values [4], 'LDR')
        }
        cache.humidityair = values [ 0 ] ; 
        cache.temperature = values [ 1 ] ; 
        cache.humidityground = values [ 2 ] ; 
        cache.Co2 = values [ 3 ] ; 
        cache.LDR= values [ 4 ] ; 

  // Do something... 
  console .  log ( `HUMEDADAIRE: ${ cache.humidityair } , TEMPERATURA: ${ cache.temperature }, HUMEDADSUELO: ${ cache.humidityground  } , LDR: ${ cache.LDR } , CO2: ${ cache.Co2 }` ) ; 
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

