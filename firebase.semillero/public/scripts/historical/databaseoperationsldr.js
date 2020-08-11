
const LDRCanvasCtx = document.getElementById('LDR-chart').getContext('2d')

const LDRChartConfig = {
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

const LDRChart = new Chart(LDRCanvasCtx, LDRChartConfig)

const pushData = (arr, value) => {
  arr.push(value)
}
const ldrDisplay = document.getElementById('ldr-display')
const ldrmaxDisplay = document.getElementById('ldr-max')
const ldrAverageDisplay = document.getElementById('day-max-ldr')


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
    var sum=0;
    var average=0;
    let ldrmax=0;
   var daymax=0;
    var total_count = 0;
    snapshot.forEach(doc => {
      total_count ++;
      sum =sum + parseInt(doc.data().LDR);
      const time = new Date(doc.data() && doc.data().timestamp && doc.data().timestamp.toDate())
     const formattedTime = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()+'--' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
  pushData(LDRChartConfig.data.labels,formattedTime)
  pushData(LDRChartConfig.data.datasets[0].data, doc.get('LDR'))
  console.log(sum)
  console.log(  total_count )
if(ldrmax <  doc.data().LDR){
  ldrmax= doc.data().LDR;
  daymax=time;
}
  LDRChart.update()
  });
  average= sum/total_count;
ldrDisplay.innerHTML = '<strong>' + average + '</strong>'
ldrAverageDisplay.innerHTML = '<strong>' +ldrmax + '</strong>'
ldrmaxDisplay.innerHTML = '<strong>' + daymax + '</strong>'      
    })
.catch(err => {
  console.log('Error getting documents', err);
});
} 

