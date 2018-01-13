import Paho from './libs/mqttws31'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'
// import moment from 'moment-timezone'

const API = {
  MQTT: (topic, filterTopic = false) => {
    const mqtt = {
      hostname: 'mqtt.cmmc.io',
      port: 9001,
      path: '/mqttws',
      clientId: 'ct2' + String(Math.random() * 100)
    }

    const options = {
      useSSL: false,
      onSuccess: onConnect,
    }

    const client = new Paho.MQTT.Client(mqtt.hostname, mqtt.port, mqtt.path, mqtt.clientId)

    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    //client.connect({onSuccess: onConnect})
    client.connect(options)

    function onConnect () {
      client.subscribe(topic || 'retain/WORK/TRAFFY_V3/TEST/#')
    }

    function onConnectionLost (responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage)
        console.log('reconnecting mqtt.')
        client.connect(options)
      }
    }

    function onMessageArrived (message) {
      Dispatcher.dispatch({
        type: TypeActions.MQTT_MESSAGE_ARRIVED,
        data: message.payloadString,
        retain: message.retained
      })
    }
  },
}

export default API