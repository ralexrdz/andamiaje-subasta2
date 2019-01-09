import React, { Component } from 'react'
import Pusher from 'pusher-js'

import './Transactions.css';


class Activity extends Component {
  constructor (props) {
    super(props)
    Pusher.logToConsole = true;

    var pusher = new Pusher('a8ee0fa5cc66b88f3a48', {
      cluster: 'us2',
      forceTLS: true
    });
      
    var channel = pusher.subscribe('my-channel');
    channel.bind('new-bid', function(data) {
      console.log(data)
      let list = document.getElementById('transactions')
      list.innerHTML += `<div>${data.participant} - ${data.amount}</div>`
    });
  }
  render() {
    return (
      <div id="box">
        <h1>Activity</h1>
        <div id="transactions"></div>
      </div>
    )
  }
}

export default Activity
