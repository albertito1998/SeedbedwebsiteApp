

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
        }
      }]
    }
  }
}
const temperatureChart = new Chart(temperatureCanvasCtx, temperatureChartConfig)


const humidityCanvasCtx = document.getElementById('humidity-chart').getContext('2d')

const humidityChartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: 'rgba(197, 202, 233, 0.5)'
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
          suggestedMin: 30,
          suggestedMax: 90
        }
      }]
    }
  }
}
const humidityChart = new Chart(humidityCanvasCtx, humidityChartConfig)

const humiditygroundCanvasCtx = document.getElementById('humidityground-chart').getContext('2d')

const humiditygroundChartConfig = {
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
        }
      }]
    }
  }
}
const humiditygroundChart = new Chart(humiditygroundCanvasCtx, humiditygroundChartConfig)

const CO2CanvasCtx = document.getElementById('CO2-chart').getContext('2d')

const CO2ChartConfig = {
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
        }
      }]
    }
  }
}
const CO2Chart = new Chart(CO2CanvasCtx, CO2ChartConfig)

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
        }
      }]
    }
  }
}
const LDRChart = new Chart(LDRCanvasCtx, LDRChartConfig)




const pushData = (arr, value, maxLen) => {
  arr.push(value)
  if (arr.length > maxLen) {
    arr.shift()
  }
}

const humidityDisplay = document.getElementById('humidity-display')
const temperatureDisplay = document.getElementById('temperature-display')
const humiditygroundDisplay = document.getElementById('humidityground-display')
const CO2Display = document.getElementById('CO2-display')
const LDRDisplay = document.getElementById('LDR-display')
const TimePhotoDisplay = document.getElementById('upload-time')



//PICK PHOTO STORAGE

// Create a reference to the file we want to download





// Get the download URL
var storageRef = storage.ref();
storageRef.child('foto3.png').getDownloadURL().then(function (url) {
  const imagen = document.getElementById('semillero');
  imagen.src = url;
  console.log('File available at', url);
  const now = new Date()
  const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  TimePhotoDisplay.innerHTML = '<strong>' + timeNow + '</strong>'
}).catch(function (error) {

  switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});








const temperatureListener = database.ref('temperature')

temperatureListener.on('value', data => {
  const now = new Date()
  const timeNow =
    now.getHours() + ':' + now.getMinutes() + ':' +
    now.getSeconds()
  pushData(temperatureChartConfig.data.labels, timeNow, 10)
  pushData(temperatureChartConfig.data.datasets[0].data, data.val(), 10)
  console.log(data.val())
  temperatureChart.update()
  temperatureDisplay.innerHTML = '<strong>' + data.val()
    + '</strong>'
}, errdata => {
  console.log('Error!');
  console.log(err);
})

/**
 * Similarly, we add the corresponding references and     listeners for humidity
 */
const humidityListener = database.ref('humidity')

humidityListener.on('value', data => {
  const now = new Date()
  const timeNow =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  pushData(humidityChartConfig.data.labels, timeNow, 10)
  pushData(humidityChartConfig.data.datasets[0].data, data.val(), 10)
  humidityChart.update()
  humidityDisplay.innerHTML = '<strong>' + data.val() + '</strong>'
})

const humiditygroundListener = database.ref('humidityground')

humiditygroundListener.on('value', data => {
  const now = new Date()
  const timeNow =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  pushData(humiditygroundChartConfig.data.labels, timeNow, 10)
  pushData(humiditygroundChartConfig.data.datasets[0].data, data.val(), 10)
  humiditygroundChart.update()
  humiditygroundDisplay.innerHTML = '<strong>' + data.val() + '</strong>'
})

const CO2Listener = database.ref('CO2')

CO2Listener.on('value', data => {
  const now = new Date()
  const timeNow =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  pushData(CO2ChartConfig.data.labels, timeNow, 10)
  pushData(CO2ChartConfig.data.datasets[0].data, data.val(), 10)
  CO2Chart.update()
  CO2Display.innerHTML = '<strong>' + data.val() + '</strong>'
})

const LDRListener = database.ref('LDR')

LDRListener.on('value', data => {
  const now = new Date()
  const timeNow =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  pushData(LDRChartConfig.data.labels, timeNow, 10)
  pushData(LDRChartConfig.data.datasets[0].data, data.val(), 10)
  LDRChart.update()
  LDRDisplay.innerHTML = '<strong>' + data.val() + '</strong>'
})




//INICIALIZAR

var beginningDate = Date.now()
var beginningDateObject = new Date(beginningDate);
console.log(beginningDateObject);
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const inicializar = () => {
  let sensors = db.collection('sensors');
  var query = sensors.orderBy('timestamp', 'desc').startAt(beginningDateObject).limit(5).get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      querySnapshot.forEach(doc => {
        const time = new Date(doc.data() && doc.data().timestamp && doc.data().timestamp.toDate())
        const formattedTime = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear() + '--' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        pushData(temperatureChartConfig.data.labels, formattedTime)
        pushData(temperatureChartConfig.data.datasets[0].data, doc.get('temperature'))
        pushData(LDRChartConfig.data.labels, formattedTime)
        pushData(LDRChartConfig.data.datasets[0].data, doc.get('LDR'))
        pushData(CO2ChartConfig.data.labels, formattedTime)
        pushData(CO2ChartConfig.data.datasets[0].data, doc.get('CO2'))
        pushData(humidityChartConfig.data.labels, formattedTime)
        pushData(humidityChartConfig.data.datasets[0].data, doc.get('humidityRef'))
        pushData(humiditygroundChartConfig.data.labels, formattedTime)
        pushData(humiditygroundChartConfig.data.datasets[0].data, doc.get('humidityground'))
        temperatureChart.update()
        LDRChart.update()
        CO2Chart.update()
        humidityChart.update()
        humiditygroundChart.update()
        console.log('No matching documents.', doc.get('temperature'))
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

inicializar()








