const tempmaxcropDisplay = document.getElementById('temp-max-crop')
const tempmincropDisplay = document.getElementById('temp-min-crop')
const humiditymaxcropDisplay = document.getElementById('humiditymax-crop')
const humiditymincropDisplay = document.getElementById('humiditymin-crop')
const Co2cropDisplay = document.getElementById('Co2-crop')
const cropDisplay = document.getElementById('crop')

const selector=document.querySelector('#selector');
selector.addEventListener('submit',(e) =>{
    e.preventDefault();
 var instance = M.FormSelect.getInstance($('#select'));
var d = instance.getSelectedValues()[0];
var resultado;
console.log('selection',d);
switch (d) {
  case '1':
    resultado='tomato';
    break;
  case '2':
     resultado='aubergine';
    break;
  case '3':
    resultado='cucumber';
   break;
    case '4':
      resultado='pepper';
      break;
  default:
   resultado='';
    break;
}
console.log('resultado', resultado);

cropDisplay.innerHTML = '<strong>' + resultado + '</strong>'
//RETRIEVE THE DATA
conditions= databasesensor.collection('conditions').doc(resultado);
let getDoc = conditions.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      tempmaxcropDisplay.innerHTML = '<strong>' + doc.data().temperaturemax + '</strong>'
      tempmincropDisplay.innerHTML = '<strong>' + doc.data().temperaturemin + '</strong>'
      humiditymaxcropDisplay.innerHTML = '<strong>' + doc.data().humiditymax + '</strong>'
      humiditymincropDisplay.innerHTML = '<strong>' + doc.data().humiditymin + '</strong>'
      Co2cropDisplay.innerHTML = '<strong>' + doc.data().Co2 + '</strong>'
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
});




