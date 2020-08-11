
require('dotenv').config();
const accountSid=process.env.accountSid;
const authToken=process.env.authToken;
const client =require ('twilio')(accountSid,authToken);
function sendmessage(){
client.messages.create({
from: 'whatsapp:'+15186502349,
to:'whatsapp:' +process.env.MY_PHONE_NUMBER,
body: 'Irrigating...',
mediaUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AAn_Irrigation_sprinkler_watering_a_garden.gif&psig=AOvVaw1kxdurVoodB7nYlkqACi_9&ust=1596024771820000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjtluH17-oCFQAAAAAdAAAAABAD'
}).then(message=>{
    console.log(message.sid)
}).catch(err=>{
    console.error(err)
});
}

sendmessage();

module.exports.sendmessage=sendmessage();
