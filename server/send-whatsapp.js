
require('dotenv').config();
const cv=require('opencv4nodejs');
const accountSid=process.env.accountSid;
const authToken=process.env.authToken;
const client =require ('twilio')(accountSid,authToken);

function sendmessage() { 

const wCap = new cv.VideoCapture(0); //no se si esto esta bien
wCap.set(cv.CAP_PROP_FRAME_WIDTH,300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT,300);
const frame =wCap.read();
const image=cv.imencode('.jpg',frame).toString('base64')

client.messages.create({
from: 'whatsapp:+14155238886',
to:'whatsapp:'+process.env.MY_PHONE_NUMBER,
body: 'hello from Youtube',
mediaUrl:'image/jpeg;base64,${image}'
}).then(message=>{
    console.log(message.sid)
}).catch(err=>{
    console.error(err)
});
} 
module.exports.sendmessage=sendmessage;