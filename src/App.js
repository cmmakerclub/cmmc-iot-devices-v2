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

      this.setState({
        devices: storeDevices,
        messageArrived: storeMessageArrived
      })

    })
  }

  componentDidMount () {
  }

  render () {

    return (
      <div className='container'>

        <Navbar/>

        <div className="row" style={{marginTop: 30}}>
          {this.state.devices.map(device => { return <Device data={device} key={uuid()}/> })}
        </div>

        <div className="row" style={{marginTop: 20, marginBottom: 30}}>

          <div className="col">
            <div className="card">
              <div className="card-body">

                <div className="form-group">
                  <h3>Message Arrived</h3>
                </div>

                <div className="form-group">
                  <code>
                    {this.state.messageArrived.body}
                  </code>
                </div>

                <form>
                  <div className="form-group text-right">
                    <CopyToClipboard text={this.state.messageArrived.body}>
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