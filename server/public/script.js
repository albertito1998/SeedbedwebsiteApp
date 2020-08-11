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
const fetchTemperature = () => {

}

const fetchHumidity = () => {

}
const fetchHumidityground = () => {

}
const fetchCO2 = () => {

}
const fetchLDR = () => {

}

const fetchTemperatureHistory = () => {

}

const fetchHumidityHistory = () => {

}
const fetchHumiditygroundHistory = () => {

}
const fetchCO2History = () => {

}
const fetchLDRHistory = () => {

}



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
/**
const fetchTemperature = () => {
  fetch('/temperature')
    .then(results => {
      return results.json()
    })
    .then(data => {
      const now = new Date()
      const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      pushData(temperatureChartConfig.data.labels, timeNow, 10)
      pushData(temperatureChartConfig.data.datasets[0].data, data.value, 10)
      temperatureChart.update()
      temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}

const fetchHumidity = () => {
  fetch('/humidity')
    .then(results => {
      return results.json()
    })
    .then(data => {
      const now = new Date()
      const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      pushData(humidityChartConfig.data.labels, timeNow, 10)
      pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)
      humidityChart.update()
      humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}

const fetchHumidityground= () => {
  fetch('/humidityground')
    .then(results => {
      return results.json()
    })
    .then(data => {
      const now = new Date()
      const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      pushData(humiditygroundChartConfig.data.labels, timeNow, 10)
      pushData(humiditygroundChartConfig.data.datasets[0].data, data.value, 10)
      humiditygroundChart.update()
      humiditygroundDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}

const fetchCO2= () => {
  fetch('/CO2')
    .then(results => {
      return results.json()
    })
    .then(data => {
      const now = new Date()
      const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      pushData(CO2ChartConfig.data.labels, timeNow, 10)
      pushData(CO2ChartConfig.data.datasets[0].data, data.value, 10)
      CO2Chart.update()
      CO2Display.innerHTML = '<strong>' + data.value + '</strong>'
    })
}
const fetchLDR= () => {
  fetch('/LDR')
    .then(results => {
      return results.json()
    })
    .then(data => {
      const now = new Date()
      const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      pushData(LDRChartConfig.data.labels, timeNow, 10)
      pushData(LDRChartConfig.data.datasets[0].data, data.value, 10)
      LDRChart.update()
      LDRDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}*/
  /**
 * Call the APi we created

// APIS DE CALCULAR LA HISTORY
const fetchTemperatureHistory = () => {
 
fetch('/temperature/history')
    .then(results => {
      return results.json()
    })
    .then(data => {
      data.forEach(reading => {
        const time = new Date(reading.createdAt + 'Z')
        const formattedTime =
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        pushData(temperatureChartConfig.data.labels, formattedTime, 10)
        pushData(
          temperatureChartConfig.data.datasets[0].data,
          reading.value,
          10
        )
      })
      temperatureChart.update()
    })
}


const fetchHumidityHistory = () => {
  fetch('/humidity/history')
      .then(results => {
        return results.json()
      })
      .then(data => {
        data.forEach(reading => {
          const time = new Date(reading.createdAt + 'Z')
          const formattedTime =
            time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
          pushData(humidityChartConfig.data.labels, formattedTime, 10)
          pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
        })
        humidityChart.update()
      })
}


const fetchHumiditygroundHistory = () => {
  fetch('/humidityground/history')
      .then(results => {
        return results.json()
      })
      .then(data => {
        data.forEach(reading => {
          const time = new Date(reading.createdAt + 'Z')
          const formattedTime =
            time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
          pushData(humidityChartConfig.data.labels, formattedTime, 10)
          pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
        })
        humidityChart.update()
      })
}

const fetchCO2History = () => {
  fetch('/CO2/history')
      .then(results => {
        return results.json()
      })
      .then(data => {
        data.forEach(reading => {
          const time = new Date(reading.createdAt + 'Z')
          const formattedTime =
            time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
          pushData(humidityChartConfig.data.labels, formattedTime, 10)
          pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
        })
        humidityChart.update()
      })
}

const fetchLDRHistory = () => {
  fetch('/LDR/history')
      .then(results => {
        return results.json()
      })
      .then(data => {
        data.forEach(reading => {
          const time = new Date(reading.createdAt + 'Z')
          const formattedTime =
            time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
          pushData(humidityChartConfig.data.labels, formattedTime, 10)
          pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
        })
        humidityChart.update()
      })
}
 */
const fetchTemperatureRange = () => {

}

const fetchHumidityRange = () => {

}
const fetchHumiditygroundRange = () => {

}

const fetchCO2Range = () => {

}
const fetchLDRRange = () => {

}





function getParameterByName (name) {
  const url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
/**
const fetchTemperatureRange = () => {

  const start = getParameterByName('start')
  const end = getParameterByName('end')

  
   * These parameters are then passed on to make AJAX requests to get the range of
   * readings from the server
   
  fetch(`/temperature/range?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      data.forEach(reading => {
  
        const time = new Date(reading.createdAt + 'Z')
        const formattedTime =
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        pushData(temperatureChartConfig.data.labels, formattedTime, 10)
        pushData(
          temperatureChartConfig.data.datasets[0].data,
          reading.value,
          10
        )
      })
      temperatureChart.update()
    })

  fetch(`/temperature/average?start=${start}&end=${end}`)
  .then(results => {
    return results.json()
  })
  .then(data => {
    temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
  })
}

const fetchHumidityRange = () => {
  const start = getParameterByName('start')
  const end = getParameterByName('end')
  fetch(`/humidity/range?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      data.forEach(reading => {
        const time = new Date(reading.createdAt + 'Z')
        const formattedTime =
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        pushData(humidityChartConfig.data.labels, formattedTime, 10)
        pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
      })
      humidityChart.update()
    })
  fetch(`/humidity/average?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}

const fetchHumiditygroundRange = () => {
  const start = getParameterByName('start')
  const end = getParameterByName('end')
  fetch(`/humidityground/range?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      data.forEach(reading => {
        const time = new Date(reading.createdAt + 'Z')
        const formattedTime =
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        pushData(humidityChartConfig.data.labels, formattedTime, 10)
        pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
      })
      humidityChart.update()
    })
  fetch(`/humidityground/average?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}

const fetchCO2Range = () => {
  const start = getParameterByName('start')
  const end = getParameterByName('end')
  fetch(`/CO2/range?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      data.forEach(reading => {
        const time = new Date(reading.createdAt + 'Z')
        const formattedTime =
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        pushData(humidityChartConfig.data.labels, formattedTime, 10)
        pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
      })
      humidityChart.update()
    })
  fetch(`/CO2/average?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}

const fetchLDRRange = () => {
  const start = getParameterByName('start')
  const end = getParameterByName('end')
  fetch(`/LDR/range?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      data.forEach(reading => {
        const time = new Date(reading.createdAt + 'Z')
        const formattedTime =
          time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
        pushData(humidityChartConfig.data.labels, formattedTime, 10)
        pushData(humidityChartConfig.data.datasets[0].data, reading.value, 10)
      })
      humidityChart.update()
    })
  fetch(`/LDR/average?start=${start}&end=${end}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
    })
}


const addSocketListeners = () => {
  
  const socket = io()


  socket.on('new-temperature', data => {
    const now = new Date()
    const timeNow =
  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    pushData(temperatureChartConfig.data.labels, timeNow, 10)
    pushData(temperatureChartConfig.data.datasets[0].data, data.value, 10)

    temperatureChart.update()
    temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
  })

  socket.on('new-humidity', data => {
    const now = new Date()
    const timeNow =
  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    pushData(humidityChartConfig.data.labels, timeNow, 10)
    pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)

    humidityChart.update()
    humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
  })

  socket.on('new-humidityground', data => {
    const now = new Date()
    const timeNow =
  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    pushData(humidityChartConfig.data.labels, timeNow, 10)
    pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)

    humidityChart.update()
    humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
  })

  socket.on('new-CO2', data => {
    const now = new Date()
    const timeNow =
  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    pushData(humidityChartConfig.data.labels, timeNow, 10)
    pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)

    humidityChart.update()
    humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
  })
  socket.on('new-LDR', data => {
    const now = new Date()
    const timeNow =
  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    pushData(humidityChartConfig.data.labels, timeNow, 10)
    pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)

    humidityChart.update()
    humidityDisplay.innerHTML = '<strong>' + data.value + '</strong>'
  })
}
*/
if (!getParameterByName('start') && !getParameterByName('end')) {
  /**
   * The fetchTemperature and fetchHumidity calls are now moved here
   * and are called only when the "start" and "end" parametes are not present in the query
   * In this case, we will be showing the live reading implementation
   */
  setInterval(() => {
    fetchTemperature()
    fetchHumidity()
    fetchHumidityground()
    fetchCO2()
    fetchLDR()
  }, 2000)
  fetchHumidityHistory()
  fetchTemperatureHistory()
  fetchHumiditygroundHistory()
  fetchCO2History()
  fetchLDRHistory()
} else {
  /**
   * If we do have these parameters, we will only be showing the range of readings requested by calling the functions we defined in this section
   */
  fetchHumidityRange()
  fetchTemperatureRange()
  fetchHumiditygroundRange()
  fetchCO2Range()
  fetchLDRRange()
}


