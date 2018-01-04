import Paho from 'paho-mqtt/mqttws31'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'

const API = {
  MQTT: (topic, filterTopic = false) => {
    const init = {
      hostname: 'odin.cmmc.io',
      port: 9001,
      path: '',
      clientId: String(Math.random() * 100)
    }

    const options = {
      //useSSL: true,
      userName: 'cmmc',
      password: 'cmmc',
      onSuccess: onConnect
    }

    const client = new Paho.MQTT.Client(init.hostname, init.port, init.path, init.clientId)

    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    //client.connect({onSuccess: onConnect})
    client.connect(options)

    function onConnect () {
      //console.log('onConnect')
      client.subscribe(topic || 'WORK/TRAFFY_V3/TEST/#')
    }

    function onConnectionLost (responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage)
      }
    }

    function onMessageArrived (message) {

      Dispatcher.dispatch({
        type: TypeActions.MQTT_MESSAGE_ARRIVED,
        data: message.payloadString,
        retain: message.retained
      })

      Dispatcher.dispatch({
        type: TypeActions.MQTT_TOPIC_MESSAGE_ARRIVED,
        data: message.payloadString,
        retain: message.retained
      })

    }
  }
}

export default API