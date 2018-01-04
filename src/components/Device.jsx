import React from 'react'

const DeviceStatus = (props) => {

  const cardHeaderActive = (props.online || !props.retain) ? 'card-header bg-success' : 'card-header bg-secondary'

  return (
    <div className="col-md-3">
      <div className="form-group">
        <div className="card">
          <div className={cardHeaderActive}>
          <b>
            <small style={{color: 'white'}}>
              UUID : {props.title.substr(-4)}
            </small>
          </b>
          </div>
          <div className="card-body text-primary">
            <b>
              <p className='text-danger'><i className='fa fa-clock-o'/>&ensp;{props.lastUpdate}</p>
              <p>uptime_s : {props.uptime_s}</p>
              <p>battery_percent : {props.battery_percent}</p>
              <p>working_count : {props.working_count}</p>
              <p>open_fail : {props.open_fail}</p>
              <p>boot_count : {props.boot_count}</p>
              <p>sent_data_count : {props.sent_data_count}</p>
            </b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceStatus
