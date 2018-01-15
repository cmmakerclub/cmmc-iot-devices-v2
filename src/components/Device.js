import React, { Component } from 'react'
import moment from 'moment-timezone'
import classNames from 'classnames'
import swal from 'sweetalert'

moment.locale('th')

export default class Device extends Component {

  constructor (props) {
    super()
    this.state = {data: props.data}
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      let dataShouldBeArrivedAtTime = (this.state.data.server_unix + this.state.data.sleep_time_ms)
      let remainingTime = dataShouldBeArrivedAtTime - moment.now()
      const d = Object.assign({}, this.state.data, {will_update_ms: (remainingTime / 1000).toFixed(2)})
      this.setState({data: d})
    }, 100)
  }

  componentWillUpdate () { }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const styles = {
      content: {marginBottom: 5},
      footer: {marginBottom: 0}
    }
    const txtClass = classNames({
      'text': true,
      'text-danger': this.state.data.will_update_ms < 60
    })

    const info = (event) => {
      event.preventDefault()
      return swal({
        title: `LINKIT : ${this.state.data.linkit}`,
        text: `${JSON.stringify(this.state.data)}`
      })
    }

    return (
      <div className="col-md-3">
        <div className="form-group">
          <div className="card">
            <div className='card-header bg-success'>
              <b>
                <small style={{color: 'white'}}>
                  LINKIT : {this.state.data.linkit}
                </small>
              </b>
            </div>
            <div className="card-body text-primary">
              <p className={txtClass}>
                <i className='fa fa-clock-o'/>
                &ensp;{moment(this.state.data.server_unix).fromNow()}
              </p>
              <p style={styles.content} className={txtClass}>Next
                update: <span>{this.state.data.will_update_ms}s</span></p>
              <p style={styles.content}>Uptime : {this.state.data.uptime_s}s</p>
              <p style={styles.content}>Battery: {this.state.data.battery_raw / 100.0}v</p>
              <p
                style={styles.content}>{this.state.data.gps_latitude.toFixed(7)}, {this.state.data.gps_longitude.toFixed(7)}
                ({this.state.data.gps_diff.toFixed(2)})</p>
              <button type='button' className='btn btn-primary' style={{width: '100%'}} onClick={e => info(e)}>
                <i className='fa fa-info-circle'/> MORE INFO
              </button>
              <hr/>
              <p className='text-secondary' style={styles.footer}>App v{this.state.data.app_version}, Parser
                v{this.state.data.parser_version}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

