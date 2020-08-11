
const temperatureCanvasCtx = document.getElementById('temperature-chart').getContext('2d')

const temperatureChartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: 'rgba(255, 205, 210, 0.5)'
    }]
  },
  options: {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 10,
          suggestedMax: 40
        },
      }]
    },
  }
}

const temperatureChart = new Chart(temperatureCanvasCtx, temperatureChartConfig)

const pushData = (arr, value) => {
  arr.push(value)
}
const temperatureDisplay = document.getElementById('temperature-display')
const temperaturemaxDisplay = document.getElementById('temperature-max')
const temperatureAverageDisplay = document.getElementById('day-max-temp')


 const settings = { timestampsInSnapshots: true};
 databasesensor.settings(settings);



const time=document.querySelector('#time');
time.addEventListener('submit',(e) =>{
    e.preventDefault();
    // get time info
    //var starttime=new Date(getTime((time['starttime'].value)));
    var startfulldate= new Date((time['startdate'].value));
    var endfulldate= new Date((time['enddate'].value));
    //var endtime=new Date ((time['endtime'].value));
 //const startfulldatestartfulldate=startdate+starttime;
 //const endfulldate=enddate+endtime;
 console.log('Starting',startfulldate);
 console.log('Ending',endfulldate);
 fetchReadingsBetweenTimeTemperature(startfulldate, endfulldate)
})

 const fetchReadingsBetweenTimeTemperature = (startfulldate, endfulldate) => {
  
  let valueSensors = databasesensor.collection('sensors');
let query = valueSensors.where('timestamp', '>=', startfulldate).where('timestamp', '<=', endfulldate).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    var suma=0;
    var media=0;
    let tempmax=0;
   var daymax=0;
    var total_count = 0;
    snapshot.forEach(doc => {
      total_count ++;
      suma =suma+ parseInt(doc.data().temperature);
      const time = new Date(doc.data() && doc.data().timestamp && doc.data().timestamp.toDate())
     const formattedTime = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()+'--' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
  pushData(temperatureChartConfig.data.labels,formattedTime)
  pushData(temperatureChartConfig.data.datasets[0].data, doc.get('temperature'))
  console.log( suma )
  console.log(  total_count )
if(tempmax <  doc.data().temperature){
  tempmax= doc.data().temperature;
  daymax=time;
}
  temperatureChart.update()
  });
  media= suma/total_count;
temperatureDisplay.innerHTML = '<strong>' + media + '</strong>'
temperatureAverageDisplay.innerHTML = '<strong>' +tempmax + '</strong>'
temperaturemaxDisplay.innerHTML = '<strong>' + daymax + '</strong>'      
    })
.catch(err => {
  console.log('Error getting documents', err);
});
} 

