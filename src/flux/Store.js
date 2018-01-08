import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import ActionTypes from './Constants'
import _ from 'underscore'

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = {devices: [], messageArrived: ''}
  }

  __onDispatch (action) {

    if (action.type === ActionTypes.MQTT_MESSAGE_ARRIVED) {

      const dataIncoming = JSON.parse(action.data)
      dataIncoming.retain = action.retain
      let storeDevices = this.state.devices
      storeDevices.push(dataIncoming)
      storeDevices = _.uniq(storeDevices, device => device.uuid)
      this.state.devices = storeDevices
      this.__emitChange()

    } else if (action.type === ActionTypes.MQTT_TOPIC_MESSAGE_ARRIVED) {

      this.state.messageArrived = action.data
      this.__emitChange()

    }

  }

}

export default new MyStore(AppDispatcher)