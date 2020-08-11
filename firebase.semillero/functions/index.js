const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// }); functions.config().firebase

const admin =require('firebase-admin')
admin.initializeApp()
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const db= admin.firestore();
exports.firestoreEmail=functions.firestore.document('contact/{contactId}').onWrite((change, context) => {
const name =context.params.contactId;
//const name = require('./name');

   return db.collection('contact').doc(name)
    .get().then(doc=>{
        const contact= doc.data(); 

    const msg={
        to: 'albegoco@gmail.com',
        from: contact.email,
        templateId: 'd-23ae07a22d564b0b90c9146b0c0f94db',
        dynamicTemplateData: {
            name: contact.name,
            message: contact.message,
            time: contact.dateExample,
          }
    }; 
    return sgMail.send(msg)
    })
    .then(()=>console.log('email sent'))
    .catch(err=>console.log(err))
})

exports.PhotoRealTime = functions.storage.object().onFinalize(async (object) => { 
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
    if (!contentType.startsWith('image/')) {
        return console.log('This is not an image.');
      }    

});
//exports.sendmessagePump= functions.database.ref('bomba').onUpdate((change)=>{
//    const activation=change.after.val();
 //   if(activation<=90){return;}
 //   const payload={
 //       notification:{
//title: `Your seed beed is irrigating!!! ${user.email}`,
//body: 'Check the App'
 //       }
 //   };
        //Query database for FCM token
//const databaseRoot=change.before.ref.root;
//return databaseRoot.child('users/'+).then( (snapshot)=>{
 //   const fcmToken=snapshot.val().fecmToken;
 //   return admin.messaging().sendToDevice(fcmToken,Payload);
//});
//})

exports.addAdminRole = functions.https.onCall((data, context) => {
    //check request is made an admin
    if(context.auth.token.admin !==true){
        return{error:'only admins can add other admins, sucker'}
    }
    // get user and add admin custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      })
    }).then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`
      }
    }).catch(err => {
      return err;
    });
  });
