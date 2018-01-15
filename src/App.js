import React, { Component } from 'react'
import Navbar from './components/Menu'
import Device from './components/Device'
import uuid from 'uuid'
import store from './flux/Store'
import { CopyToClipboard } from 'react-copy-to-clipboard'

let moment = require('moment-timezone')
moment.locale('th')

export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      devices: [],
      messageArrived: {
        body: ''
      }
    }

    this.storeData = store.state

    store.addListener(() => {
      const storeDevices = this.storeData.devices
      const storeMessageArrived = {
        body: this.storeData.messageArrived
      }

      this.setState({devices: storeDevices, messageArrived: storeMessageArrived})

    })
  }

  componentDidMount () { }

  render () {

    return (
      <div className='container'>

        <Navbar/>

        <div className="row" style={{marginTop: 20, marginBottom: 10}}>
          {this.state.devices.map(device => <Device data={device} key={uuid()}/>)}
        </div>

      </div>
    )
  }

}