import React, { Component } from 'react'
import ActionTypes from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'
import store from '../flux/Store'

export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  showAll = () => {
    Dispatcher.dispatch({
      type: ActionTypes.SHOW_ALL_DEVICES
    })
  }

  filterOnline = () => {
    Dispatcher.dispatch({
      type: ActionTypes.FILTER_DEVICES_ONLINE
    })
  }

  filterOffline = () => {
    Dispatcher.dispatch({
      type: ActionTypes.FILTER_DEVICES_OFFLINE
    })
  }

  filterDeviceName = (e) => {
    e.preventDefault()
    Dispatcher.dispatch({
      type: ActionTypes.FILTER_DEVICES_NAME,
      data: e.target.value
    })
    //console.log(e.target.value)
  }

  render () {

    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href=""><h4>CMMC DEVICES V.2</h4></a>
      </nav>
    )
  }

}