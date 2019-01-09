import React, { Component } from 'react'
import Pusher from 'pusher-js'

import './Participants.css';


class Participants extends Component {
  constructor (props) {
    super(props)
    Pusher.logToConsole = true;

    var pusher = new Pusher('a8ee0fa5cc66b88f3a48', {
      cluster: 'us2',
      forceTLS: true
    });
      
    var channel = pusher.subscribe('my-channel');
    channel.bind('participants-updated', function(data) {
      console.log(data)
      let list = document.getElementById('participants')
      if (list) {
        console.log(list)
        list.innerHTML = ''
        data.participants.forEach(participant => {
          console.log(participant)
          list.innerHTML += `<div>${participant}</div>`
        });
      }
    });
  }
  render() {
    return (
      <div id="box">
        <h1>Participantes </h1>
        <div id="participants"></div>
      </div>
    )
  }
}

export default Participants
