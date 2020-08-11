function callGreenPump(){
    document.getElementById('pumpColour').setAttribute('fill','#00ff00');
    document.getElementById('PumpCurrentState').innerHTML="ON"
}
function callRedPump(){
    document.getElementById('pumpColour').setAttribute('fill','#ff0000');
    document.getElementById('PumpCurrentState').innerHTML="OFF"
}

function callGreenVentilator(){
    document.getElementById('ventilatorColour').setAttribute('fill','#00ff00');
    document.getElementById('VentilatorCurrentState').innerHTML="ON"
}

function callRedVentilator(){
    document.getElementById('ventilatorColour').setAttribute('fill','#ff0000');
    document.getElementById('VentilatorCurrentState').innerHTML="OFF"
}

function callGreenHumidifier(){
    document.getElementById('humidifierColour').setAttribute('fill','#00ff00');
    document.getElementById('HumidifierCurrentState').innerHTML="ON"
}

function callRedHumidifier(){
    document.getElementById('humidifierColour').setAttribute('fill','#ff0000');
    document.getElementById('HumidifierCurrentState').innerHTML="OFF"
}
function callGreenLights(){
    document.getElementById('lightsColour').setAttribute('fill','#00ff00');
    document.getElementById('LightsCurrentState').innerHTML="ON"
}

function callRedLights(){
    document.getElementById('lightsColour').setAttribute('fill','#ff0000');
    document.getElementById('LightsCurrentState').innerHTML="OFF"
}

function callYellowGasAlert(){
    document.getElementById('GasAlertColour').setAttribute('fill','#ffff00');
    document.getElementById('GasAlertCurrentState').innerHTML="WARNING"
}

function callBlackGasAlert(){
    document.getElementById('GasAlertColour').setAttribute('fill','#000000');
    document.getElementById('GasAlertCurrentState').innerHTML="OK"
}

function callYellowWaterLevel(){
    document.getElementById('WaterLevelColour').setAttribute('fill','#ffff00');
    document.getElementById('WaterLevelCurrentState').innerHTML="WARNING"
}

function callBlackWaterLevel(){
    document.getElementById('GasAlertColour').setAttribute('fill','#000000');
    document.getElementById('GasAlertCurrentState').innerHTML="OK"
}

const PumpListener = database.ref('pumpCurrentState');
const VentilatorListener = database.ref('ventilatorCurrentState');
const LightsListener = database.ref('lightCurrentState');
const HumidifierListener = database.ref('humidifierCurrentState');
const GasAlertListener = database.ref('gasAlert');
const WaterLevelListener = database.ref('waterLevel');

PumpListener.on('value', data => {
    if(data.val()=='H'){
        callGreenPump();
    }else{
        callRedPump();
    }
});
VentilatorListener.on('value', data => {
    if(data.val()=='H'){
        callGreenVentilator();
    }else{
        callRedVentilator();
    }
});
LightsListener.on('value', data => {
    if(data.val()=='H'){
        callGreenLights();
    }else{
        callRedLights();
    }
});
HumidifierListener.on('value', data => {
    if(data.val()=='H'){
        callGreenHumidifier();
    }else{
        callRedHumidifier();
    }
});
WaterLevelListener.on('value', data => {
    if(data.val()=='H'){
        callYellowWaterLevel();
    }else{
        callBlackWaterLevel();
    }
});
GasAlertListener.on('value', data => {
    if(data.val()=='H'){
        callYellowGasAlert();
    }else{
        callBlackGasAlert();
    }
});



