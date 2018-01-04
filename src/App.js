import React, { Component } from 'react'
import Navbar from './components/Menu'
import Device from './components/Device'
import uuid from 'uuid'
import ActionTypes from './flux/Constants'
import Dispatcher from './flux/Dispatcher'
import store from './flux/Store'
import _ from 'underscore'
import API from './API'
import { CopyToClipboard } from 'react-copy-to-clipboard'

let moment = require('moment-timezone')
moment.locale('th')

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      devices: [],
      devicesOnline: [],
      bufferDevices: [],
      topicMessages: '',
      lastMessage: {
        uuid: '',
        time: ''
      }
    }

    this.storeData = store.state

    store.addListener(() => {
      const devices = this.storeData.devices
      const devicesOnline = this.storeData.devicesOnline
      this.bufferDevices = this.state.bufferDevices
      const topicMessages = this.storeData.topicMessages

      const arrayDevices = []
      const arrayDevicesOnline = []

      if (devices !== this.state.devices) {
        Object.keys(devices).map(key => {
          arrayDevices.push(devices[key])
        })
        this.setState({devices: arrayDevices})
      }

      if (devicesOnline !== this.state.devicesOnline) {

        let compareDevices = []

        Object.keys(devicesOnline).map(key => {
          arrayDevicesOnline[key] = (devicesOnline[key])
          compareDevices.push(devicesOnline[key])
        })
        this.setState({devicesOnline: arrayDevicesOnline})

        if (!_.isEmpty(compareDevices)) {
          this.setState({devices: compareDevices})
        }

        console.log('devices : ', this.state.devices)
        console.log('devices online : ', arrayDevicesOnline)
        console.log('compare devices : ', compareDevices)
      }

      if (topicMessages !== this.state.topicMessages) {

        const messageArrived = JSON.parse(topicMessages)

        const lastMessage = {
          uuid: messageArrived.uuid,
          time: moment.unix(messageArrived.gps_us).format('DD/MM/YYYY HH:mm:ss')
        }

        this.setState({lastMessage: lastMessage})

        this.setState({topicMessages: topicMessages})
      }

      //console.log(this.storeData)
    })

    console.log('constructor', this.props)
  }

  componentDidMount () {
    console.log('componentDidMount', this.props)
  }

  filterTopic = (e) => {
    e.preventDefault()
    this.setState({filterTopic: `MARU/${e.target.value}`})
    API.MQTT(this.state.filterTopic, true)
  }

  render () {

    return (
      <div className='container'>

        <Navbar/>

        <div className="row" style={{marginTop: 30}}>

          {
            this.state.devices.map(device => {

              return <Device
                key={uuid()}
                title={device.uuid}
                lastUpdate={moment.unix(device.gps_us).fromNow()}
                uptime_s={device.uptime_s}
                battery_percent={device.battery_percent}
                working_count={device.working_count}
                open_fail={device.open_fail}
                boot_count={device.boot_count}
                sent_data_count={device.sent_data_count}
                retain={device.retain}
                online={(this.state.devicesOnline[device.uuid]) !== undefined && true}
              />
            })
          }

        </div>

        <div className="row" style={{marginTop: 20, marginBottom: 30}}>

          <div className="col">
            <div className="card">
              <div className="card-body">

                <div className="form-group">
                  <h3>Message Arrived</h3>
                </div>

                <div className="form-group text-primary">
                  <b>
                    uuid : {this.state.lastMessage.uuid.substr(-4)}<br/>
                    sent : {(this.state.lastMessage.time) ? moment(this.state.lastMessage.time).fromNow() : ''}
                  </b>
                </div>

                <div className="form-group">
                  <code>
                    {this.state.topicMessages}
                  </code>
                </div>

                <form>
                  <div className="form-group text-right">
                    <CopyToClipboard text={this.state.topicMessages}>
                      <button type='button' className='btn btn-primary'>
                        <i className='fa fa-clipboard'/>&nbsp;
                        copy
                      </button>
                    </CopyToClipboard>
                  </div>
                </form>

              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }

}