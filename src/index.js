import React from 'react'
import ReactDOM from 'react-dom'
import API from './API'
import App from './App'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/umd/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import registerServiceWorker from './registerServiceWorker'

API.MQTT()

ReactDOM.render(<App/>, document.getElementById('root'))
registerServiceWorker()
