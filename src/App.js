import React, { Component } from 'react'
import Navbar from './components/Menu'
import Device from './components/Device'
import uuid from 'uuid'
import store from './flux/Store'

let moment = require('moment-timezone')
moment.locale('th')

export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      devices: []
    }

    this.storeData = store.state

    store.addListener(() => {
      const storeDevices = this.storeData.devices
      this.setState({devices: storeDevices})
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