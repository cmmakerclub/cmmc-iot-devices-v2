import React, { Component } from 'react'
import moment from 'moment-timezone'
import classNames from 'classnames'
import Modal from 'react-modal'
import uuid from 'uuid'

moment.locale('th')

export default class Device extends Component {

  constructor (props) {
    super()
    this.state = {
      data: props.data,
      modalIsOpen: false,
      tableBody: []
    }
    Modal.setAppElement('#root')
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      let dataShouldBeArrivedAtTime = (this.state.data.server_unix + this.state.data.sleep_time_ms)
      let remainingTime = dataShouldBeArrivedAtTime - moment.now()
      const d = Object.assign({}, this.state.data, {
        will_update_ms: (remainingTime / 1000).toFixed(2),
        gps_latitude: parseFloat(this.state.data.gps_latitude).toFixed(7),
        gps_longitude: parseFloat(this.state.data.gps_longitude).toFixed(7)
      })
      this.setState({data: d})
    }, 100)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  render () {
    const styles = {
      content: {marginBottom: 5},
      footer: {marginBottom: 0},
      customStyle: {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'

        }
      }
    }

    const txtClass = classNames({
      'text': true,
      'text-danger': this.state.data.will_update_ms < 60
    })

    const handleClickInfo = (event) => {
      event.preventDefault()

      let tableBody = []

      Object.keys(this.state.data).map(k => {
        tableBody.push(
          <tr key={uuid()}>
            <td>{k}</td>
            <td>{typeof(this.state.data[k]) !== typeof ({}) && this.state.data[k]}</td>
          </tr>
        )
      })

      this.setState({tableBody: tableBody})
      this.openModal()
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
              <p style={styles.content}>
                {this.state.data.gps_latitude}, {this.state.data.gps_longitude}
                ({this.state.data.gps_diff.toFixed(2)})
              </p>
              <button type='button' className='btn btn-primary' style={{width: '100%'}}
                      onClick={e => handleClickInfo(e)}>
                <i className='fa fa-info-circle'/> MORE INFO
              </button>
              <hr/>
              <p className='text-secondary' style={styles.footer}>App v{this.state.data.app_version}, Parser
                v{this.state.data.parser_version}</p>
              <Modal
                isOpen={this.state.modalIsOpen}
                style={styles.customStyle}
                contentLabel="Modal"
              >
                <table className='table table-bordered'>
                  <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tableBody.map(d => d)}
                  </tbody>
                </table>
                <button className='btn btn-danger float-right' onClick={this.closeModal}>Close</button>
              </Modal>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

