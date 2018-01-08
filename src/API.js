import Paho from './libs/mqttws31'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'
import moment from 'moment-timezone'

const API = {
  MQTT: (topic, filterTopic = false) => {
    const init = {
      hostname: 'odin.cmmc.io',
      port: 9001,
      path: '',
      clientId: String(Math.random() * 100)
    }

    const options = {
      //useSSL: true,
      userName: 'cmmc',
      password: 'cmmc',
      onSuccess: onConnect
    }

    const client = new Paho.MQTT.Client(init.hostname, init.port, init.path, init.clientId)

    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    //client.connect({onSuccess: onConnect})
    client.connect(options)

    function onConnect () {
      //console.log('onConnect')
      client.subscribe(topic || 'retain/WORK/TRAFFY_V3/TEST/#')
    }

    function onConnectionLost (responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage)
      }
    }

    function onMessageArrived (message) {

      Dispatcher.dispatch({
        type: TypeActions.MQTT_MESSAGE_ARRIVED,
        data: message.payloadString,
        retain: message.retained
      })

      Dispatcher.dispatch({
        type: TypeActions.MQTT_TOPIC_MESSAGE_ARRIVED,
        data: message.payloadString,
        retain: message.retained
      })

    }
  },

  TEST: () => {
    const data = {
      'header': 'dadb',
      'version': 2,
      'project': 2,
      'type': 0,
      'uuid': '313747183135333600006800',
      'working_count': 148,
      'open_fail': 3,
      'boot_count': 1,
      'sent_data_count': 1,
      'distance_cm': 108400,
      'ic_temperature_c': 66785,
      'temperature_c': 2781,
      'humidity_percent_rh': 5655,
      'pressure_Pa': 9756275,
      'gas_resistance_ohm': 0,
      'sound_avg_db': 541,
      'max_acc': 79,
      'acc_x': 0,
      'acc_y': 1,
      'acc_z': 79,
      'gyro_x': 140,
      'gyro_y': 134,
      'gyro_z': 140,
      'mag_x': 24,
      'mag_y': 84,
      'mag_z': 8,
      'heading_degrees': 89,
      'battery_raw': 1305,
      'battery_percent': 5856,
      'sleep_time_ms': 240000,
      'boot_at_ms': 51230,
      'read_sensor_at_ms': 80434,
      'gps_latitude': 18.783126666999998,
      'gps_longitude': 98.978923333,
      'gps_altitude_cm': 0,
      'gps_us': 1515137364,
      'cnt': 0,
      'sensor': {
        'from': '000000000000',
        'to': '000000000000',
        'type': 0,
        'battery': 0,
        'field1': 0,
        'field2': 0,
        'field3': 0,
        'field4': 0,
        'field5': 0,
        'field6': 0,
        'name_len': 0,
        'device_name': 'TEST',
        'node_ms': 0,
        'sent_ms': 0,
        'checksum': 0
      },
      'tail': {'checksum': 4442, 'terminator': '0d0a'},
      'uptime_s': 69,
      'gps_diff': 1.6,
      'unix': 1515137364,
      'linkit': '9c65f920c205',
      'utc': '2018-01-05T07:29:24.000Z',
      'parser_version': '3.1.1',
      'app_version': '1.0.9',
      'raw': 'dadb0202003137471831353336000068009400000003010170a70100e1040100dd0a00001716000073de9400000000001d0200004f00000000000000010000004f0000008c000000860000008c0000001800000054000000080000005900000019050000e016000080a903001ec80000323a01000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000544553540000000000000000000000000000000000000000000000005a1100000d0a'
    }

    // var d1 = Object.assign({}, data, {uuid: 'test1'});
    // var d2 = Object.assign({}, data, {uuid: 'test2'});
    // var d3 = Object.assign({}, data, {uuid: 'test3'});
    //
    //
    // [d1, d2, d3].forEach( d => {
    //   d.gps_us = parseInt(new Date().getTime() / 1000 -  Math.random()*1000, 10)
    //   d.server_unix = moment.now()
    //   Dispatcher.dispatch({
    //     type: TypeActions.MQTT_MESSAGE_ARRIVED,
    //     data: JSON.stringify(d),
    //     retain: d.retained
    //   })
    //
    //   Dispatcher.dispatch({
    //     type: TypeActions.MQTT_TOPIC_MESSAGE_ARRIVED,
    //     data: JSON.stringify(d),
    //     retain: d.retained
    //   })
    // })

    // setInterval(() => {
    //   data.uuid = `test-${Math.random()*1000}`
    //
    //   data.gps_us = parseInt(new Date().getTime() / 1000 -  Math.random()*1000, 10)
    //
    //   Dispatcher.dispatch({
    //     type: TypeActions.MQTT_MESSAGE_ARRIVED,
    //     data: JSON.stringify(data),
    //   })
    //
    //   Dispatcher.dispatch({
    //     type: TypeActions.MQTT_TOPIC_MESSAGE_ARRIVED,
    //     data: JSON.stringify(data),
    //   })
    // }, 5000)

    // setTimeout(() => {
    //
    //
    //
    //   var d1 = Object.assign({}, data, {uuid: 'test1'});
    //   var d2 = Object.assign({}, data, {uuid: 'test2'});
    //   var d3 = Object.assign({}, data, {uuid: 'test3'});
    //
    //
    //   [d1, d2, d3].forEach( d => {
    //     d.gps_us = parseInt(new Date().getTime() / 1000 -  Math.random()*1000, 10)
    //     d.server_unix = moment.now()
    //     Dispatcher.dispatch({
    //       type: TypeActions.MQTT_MESSAGE_ARRIVED,
    //       data: JSON.stringify(d),
    //       retain: d.retained
    //     })
    //
    //     Dispatcher.dispatch({
    //       type: TypeActions.MQTT_TOPIC_MESSAGE_ARRIVED,
    //       data: JSON.stringify(d),
    //       retain: d.retained
    //     })
    //   })
    //
    // }, 100);
    // setInterval(() => {
    //   data.gps_us = parseInt(new Date().getTime() / 1000 -  Math.random()*1000, 10)
    //   data.server_unix = moment.now()
    //   Dispatcher.dispatch({
    //     type: TypeActions.MQTT_MESSAGE_ARRIVED,
    //     data: JSON.stringify(data),
    //     retain: data.retained
    //   })
    //
    //   Dispatcher.dispatch({
    //     type: TypeActions.MQTT_TOPIC_MESSAGE_ARRIVED,
    //     data: JSON.stringify(data),
    //     retain: data.retained
    //   })
    // }, 60*4*1000)

  }
}

export default API