import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import ActionTypes from './Constants'

class MyStore extends Store {

  constructor (props) {
    super(props)

    this.state = {
      devices: [],
      devicesOnline: [],
      topicMessages: ''
    }

  }

  __onDispatch (action) {

    if (action.type === ActionTypes.MQTT_MESSAGE_ARRIVED) {

      const previousValue = this.state.devices
      const currentValue = JSON.parse(action.data)
      const devicesOnline = this.state.devicesOnline

      if (previousValue[currentValue.uuid] === undefined) {
        currentValue.retain = action.retain
        previousValue[currentValue.uuid] = currentValue
      } else {
        currentValue.retain = action.retain
        devicesOnline[currentValue.uuid] = currentValue
      }

      this.__emitChange()

    } else if (action.type === ActionTypes.MQTT_TOPIC_MESSAGE_ARRIVED) {

      this.state.topicMessages = action.data
      this.__emitChange()

    }

  }

}

export default new MyStore(AppDispatcher)