import React, { Component } from 'react'
import ActionTypes from '../flux/Constants'
import Dispatcher from '../flux/Dispatcher'
import store from '../flux/Store'

export default class Menu extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href=""><h4>CMMC DEVICES V.2</h4></a>
      </nav>
    )
  }
}