/**
*IMPORT THE LIBRARIES
 */

const express = require('express')
const path = require('path')
const app = express()
const getCachedSensorReadings = require('./get-cached-sensor-readings')
const databaseOperations = require('./database-operations')

/**
*Run the files in the folder /public
 */
app.use('/public', express.static(path.join(__dirname, 'public')))


/**
*CREATE THE ROUTES
 */

app.get('/temperature', function (req, res) {
  res.json({
    value: getCachedSensorReadings.getTemperature()
  })
})
app.get('/temperature/history', function (req, res) {
  databaseOperations.fetchLatestReadings('temperature', 10, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results.reverse())
  })
})
app.get('/temperature/range', function (req, res) {
  const {start, end} = req.query
  databaseOperations.fetchReadingsBetweenTime('temperature', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results)
  })
})
app.get('/temperature/average', function (req, res) {
  const {start, end} = req.query
  databaseOperations.getAverageOfReadingsBetweenTime('temperature', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json({
      value: results['avg(value)'].toFixed(1)
    })
  })
})

app.get('/humidity', function (req, res) {
  res.json({
    value: getCachedSensorReadings.getHumidity()
  })
})
app.get('/humidity/history', function (req, res) {
  databaseOperations.fetchLatestReadings('humidity', 10, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results.reverse())
  })
})

app.get('/humidity/range', function (req, res) {
  const {start, end} = req.query
  databaseOperations.fetchReadingsBetweenTime('humidity', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results)
  })
})

app.get('/humidity/average', function (req, res) {
  const {start, end} = req.query
  databaseOperations.getAverageOfReadingsBetweenTime('humidity', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json({
      value: results['avg(value)'].toFixed(1)
    })
  })
})

app.get('/humidityground', function (req, res) {
  res.json({
    value: getCachedSensorReadings.getHumidityground()
  })
})
app.get('/humidityground/history', function (req, res) {
  databaseOperations.fetchLatestReadings('humidityground', 10, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results.reverse())
  })
})

app.get('/humidityground/range', function (req, res) {
  const {start, end} = req.query
  databaseOperations.fetchReadingsBetweenTime('humidityground', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results)
  })
})

app.get('/humidityground/average', function (req, res) {
  const {start, end} = req.query
  databaseOperations.getAverageOfReadingsBetweenTime('humidityground', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json({
      value: results['avg(value)'].toFixed(1)
    })
  })
})
app.get('/CO2', function (req, res) {
  res.json({
    value: getCachedSensorReadings.getCo2()
  })
})
app.get('/CO2/history', function (req, res) {
  databaseOperations.fetchLatestReadings('CO2', 10, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results.reverse())
  })
})

app.get('/CO2/range', function (req, res) {
  const {start, end} = req.query
  databaseOperations.fetchReadingsBetweenTime('CO2', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results)
  })
})

app.get('/CO2/average', function (req, res) {
  const {start, end} = req.query
  databaseOperations.getAverageOfReadingsBetweenTime('CO2', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json({
      value: results['avg(value)'].toFixed(1)
    })
  })
})
app.get('/LDR', function (req, res) {
  res.json({
    value: getCachedSensorReadings.getLDR()
  })
})
app.get('/LDR/history', function (req, res) {
  databaseOperations.fetchLatestReadings('LDR', 10, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results.reverse())
  })
})

app.get('/LDR/range', function (req, res) {
  const {start, end} = req.query
  databaseOperations.fetchReadingsBetweenTime('LDR', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json(results)
  })
})

app.get('/LDR/average', function (req, res) {
  const {start, end} = req.query
  databaseOperations.getAverageOfReadingsBetweenTime('LDR', start, end, (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).end()
    }
    res.json({
      value: results['avg(value)'].toFixed(1)
    })
  })
})

/**
 * Import the external dependencies required, this is:
 * 1. The native http module
 * 2. The socket.io module installed
 * 3. THe subscribe and unsibscribe functions from the notifier module
 */
const http = require('http')
const socketIo = require('socket.io')
const {subscribe, unsubscribe} = require('./notifier')

/**
 * Create a new HTTP server that wraps the "app" object that defined the server
 */
const httpServer = http.Server(app)

/**
 * Socket.io implements its own routes on top of the existing ones by wrapping the HTTP server
 */
const io = socketIo(httpServer)

io.on('connection', socket => {
  /**
   * This callback is called everytime a new client successfully makes a websocket connection with the server
   */
  console.log(`User connected [${socket.id}]`)

  /**
   * The event listeners are defined inside the callback function because we need to access the "socket" instance, to emit changes to the client
   * The "push****" listeners are called on change of a sensor respectively.
   */
  const pushTemperature = newTemperature => {
    socket.emit('new-temperature', {
      value: newTemperature
    })
  }

  const pushHumidity = newHumidity => {
    socket.emit('new-humidity', {
      value: newHumidity
    })
  }
  const pushHumidityground = newHumidityground => {
    socket.emit('new-humidityground', {
      value: newHumidityground
    })
  }
  const pushCO2 = newCO2 => {
    socket.emit('new-CO2', {
      value: newCO2
    })
  }
  const pushLDR = newLDR => {
    socket.emit('new-LDR', {
      value: newLDR
    })
  }

  /**
   * Subscribe the listeners to the sensors events
   */
  subscribe(pushTemperature, 'temperature')
  subscribe(pushHumidity, 'humidity')
  subscribe(pushHumidityground, 'humidityground')
  subscribe(pushCO2, 'CO2')
  subscribe(pushLDR, 'LDR')

  socket.on('disconnect', () => {
    /**
     * Finally, when the connection is closed, unsibscribe the listeners from their events
     */
    unsubscribe(pushTemperature, 'temperature')
    unsubscribe(pushHumidity, 'humidity')
    unsubscribe(pushHumidityground, 'humidityground')
    unsubscribe(pushCO2, 'CO2')
    unsubscribe(pushLDR, 'LDR')
  })
})

/**
 * The httpsServer.listen method is called. This exposes the routes  defined for the "app" instance as well
 */
httpServer.listen(3000, function () {
  console.log('Server listening on port 3000')
})






