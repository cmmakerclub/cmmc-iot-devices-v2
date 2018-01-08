import React, { Component } from 'react'
import moment from 'moment-timezone'

moment.locale('th')

export default class Device extends Component {

  constructor (props) {
    super()
    this.state = {
      data: props.data
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      let dataShouldBeArrivedAtTime = this.state.data.server_unix + this.state.data.sleep_time_ms
      let remainingTime = dataShouldBeArrivedAtTime - moment.now()

      // console.log('uuid : ', this.state.data.uuid)
      // console.log('dataShouldBearrivedAtTime : ', dataShouldBeArrivedAtTime)
      // console.log('remainingTime : ', remainingTime)

      const d = Object.assign({}, this.state.data)
      d.will_update_ms = (remainingTime/1000).toFixed(2)
      this.setState({data: d})
    }, 100)
  }

  componentWillUpdate () {
    // console.log(this.state.data)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {

    const styles = {
      content: {
        marginBottom: 5
      },
      footer: {
        marginBottom: 0
      }
    }

    return (
      <div className="col-md-3">
        <div className="form-group">
          <div className="card">
            <div className='card-header bg-success'>
              <b>
                <small style={{color: 'white'}}>
                  UUID : {this.state.data.uuid.substr(-4)}<br/>
                  LINKIT : {this.state.data.linkit}
                </small>
              </b>
            </div>
            <div className="card-body text-primary">
              <b>
                <p className='text-danger'>
                  <i className='fa fa-clock-o'/>
                  &ensp;{moment(this.state.data.server_unix).fromNow()}
                </p>
                <p className='text-danger'>
                  next update in:
                  &ensp;{this.state.data.will_update_ms}s
                </p>
                <p style={styles.content}>working_count : {this.state.data.working_count}</p>
                <p style={styles.content}>uptime_s : {this.state.data.uptime_s}</p>
                <p style={styles.content}>battery_raw: {this.state.data.battery_raw}</p>
                <p style={styles.content}>open_fail : {this.state.data.open_fail}</p>
                <p style={styles.content}>boot_count : {this.state.data.boot_count}</p>
                <p style={styles.content}>sent_data_count : {this.state.data.sent_data_count}</p>
                <p style={styles.content}>gps_diff : {this.state.data.gps_diff}</p>
                <p
                  style={styles.content}>{this.state.data.gps_latitude.toFixed(6)}, {this.state.data.gps_longitude.toFixed(6)}</p>
                <hr/>
                <p className='text-secondary' style={styles.footer}>parser_version
                  : {this.state.data.parser_version}</p>
                <p className='text-secondary'>app_version : {this.state.data.app_version}</p>
              </b>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

// import React, { Component } from 'react'
// import moment from 'moment-timezone'
// moment.locale('th')
//
// export default class Device extends Component {
//
//   constructor (props) {
//     super();
//
//     this.state = { }
//     this.state.data = props.data
//     // this.state.data.title = "hello"
//     console.log(this.state.data)
//   }
//
//   componentWillReceiveProps (props) {
//     // this.cardHeaderActive = (props.online || !props.retain) ? 'card-header bg-success' : 'card-header bg-secondary'
//   }
//   componentDidMount() {
//       this.timer = setInterval( () => {
//         let dataShouldBeArrivedAtTime = this.state.data.server_unix + this.state.data.sleep_time_ms
//         let remaingTime = dataShouldBeArrivedAtTime - moment.now()
//         const d = Object.assign({}, this.state.data)
//         d.will_update_ms = remaingTime
//
//         this.setState({data: d})
//
//       }, 1000)
//   }
//
//   componentWillUnmount() {
//       clearInterval(this.timer)
//   }
//
//   render() {
//
//     const styles = {
//       content: {
//         marginBottom: 5
//       },
//       footer: {
//         marginBottom: 0
//       }
//     }
//     return (
//       <div className="col-md-3">
//         <div className="form-group">
//           <div className="card">
//             <div className='card-header bg-success'>
//               <b>
//                 <small style={{color: 'white'}}>
//                   UUID : {this.state.data.uuid.substr(-4) }<br/>
//                   LINKIT : {this.state.data.linkit}
//                 </small>
//               </b>
//             </div>
//             <div className="card-body text-primary">
//               <b>
//                 <p className='text-danger'><i className='fa fa-clock-o'/>&ensp;{moment(this.state.data.gps_us).fromNow()}</p>
//                 {/*<p className='text-danger'>update in : &ensp;{this.state.data.sleep_time_ms}</p>*/}
//                 {/*<p className='text-danger'>sleep_time : &ensp;{this.state.data.sleep_time_ms}</p>*/}
//                 {/*<p style={styles.content}>will Update in: {this.state.data.will_update_ms} ms</p>*/}
//                 <p style={styles.content}>working_count : {this.state.data.working_count}</p>
//                 <p style={styles.content}>uptime_s : {this.state.data.uptime_s}</p>
//                 <p style={styles.content}>battery_percent : {this.state.data.battery_percent}</p>
//                 <p style={styles.content}>open_fail : {this.state.data.open_fail}</p>
//                 <p style={styles.content}>boot_count : {this.state.data.boot_count}</p>
//                 <p style={styles.content}>sent_data_count : {this.state.data.sent_data_count}</p>
//                 <p style={styles.content}>gps_diff : {this.state.data.gps_diff}</p>
//                 <hr/>
//                 <p className='text-secondary' style={styles.footer}>parser_version : {this.state.dataparser_version}</p>
//                 <p className='text-secondary'>app_version : {this.state.data.app_version}</p>
//               </b>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }