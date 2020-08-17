    /**
     * Define the listeners for the sensors
     */
    const listeners = {
        temperature: [],
        humidity: [],
        humidityground: [],
        CO2: [],
        LDR: []
      }
  
      /**
       * The subscribe function takes two arguments, the
       callback function, and the type.
       * It pushes the provided listener to the array of 
       listeners (depending on the "type" of sensor
       provided)
       */
      const subscribe = (listener, type) => {
        listeners[type].push(listener)
      }
  
      /**
       * To remove a listener from our list, we call   
          the unsubscribe function.
       * This accepts the exact same types of arguments as the 
       subscribe function
       */
       const unsubscribe = (removedListener, type) => {
        /**
         * The list of listeners is sifted through and the 
        listener functions are filtered on
        * the basis of whether they are the same as the 
       listener provided
         * Those that are the same (which would be only one) 
       are removed
         */
         listeners[type] = listeners[type].filter(listener => 
      listener !== removedListener)
      }
  
      /**
       * The notify function is used by the cache when it 
       receives an update from the sensor
       * It takes a value and a type as an argument, and 
       notifies all the listeners of that type that a new value 
       has been received
       */
      const notify = (value, type) => {
        listeners[type].forEach(listener => {
          listener(value)
        })
      }
  
      /**
       * The functions that are to be used by other modules are 
      exported
       */
      module.exports = {
        subscribe, unsubscribe, notify
      }
