// Listen for Form submit

document.getElementById('contactForm').addEventListener('submit',submitForm);






var messagesRef =firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
messagesRef.settings(settings);


function submitForm(e){
    e.preventDefault();
    
    // Get values
    var name= getInputVal('name');
    var email= getInputVal('email');
    var message= getInputVal('message');
    console.log(name);
    console.log(email);
    console.log(message);
    //SAVE MESSAGE
 saveMessage(name,email,message);
 //SEND EMAIL
}

// function to get form values
function getInputVal(id){
return document.getElementById(id).value;
}

//References messaging collections

function saveMessage(name,email,message){
    var docData = {
        nombre:name,
        email: email,
        message: message,   
        dateExample: firebase.firestore.FieldValue.serverTimestamp()
        }
    messagesRef.collection("contact").doc(name).set(docData).then(function(name) {
        console.log("Document written with ID: ", $name);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
