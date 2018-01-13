import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import ActionTypes from './Constants'
import _ from 'underscore'

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = {
      devices: [],
      devicesMap: {}
    }
  }

  __onDispatch (action) {

    if (action.type === ActionTypes.MQTT_MESSAGE_ARRIVED) {
      const dataIncoming = JSON.parse(action.data)
      dataIncoming.retain = action.retain

      this.state.devicesMap[dataIncoming.uuid] = Object.assign({}, dataIncoming)
      this.state.devices = _.sortBy(_.values(this.state.devicesMap), (item) => item.server_unix + item.sleep_time_ms)

      this.__emitChange()

    }
  }

}

export default new MyStore(AppDispatcher)