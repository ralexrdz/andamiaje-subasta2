import React, { Component } from 'react'
import axios from 'axios'

import './Auction.css';

import Participants from './Participants'
import Transactions from './Transactions'
import Bidder from './Bidder'
import Pusher from 'pusher-js'

class Auction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuction: false,
      highestBid: 0,
      me: null
    };
    Pusher.logToConsole = true;

    var pusher = new Pusher('a8ee0fa5cc66b88f3a48', {
      cluster: 'us2',
      forceTLS: true
    });
      
    var channel = pusher.subscribe('my-channel');
    channel.bind('auction-ended', function(data) {
      document.getElementById('winner').innerHTML = `GANADOR: ${data.winner}`
    });
  }
  joinAuction () {
    let name = document.getElementById('name').value
    this.setState({
      showAuction: true,
      me: name
    })
    axios.post('https://pusher-node-auction--ralexrdz.repl.co/participants', {
      participant: name
    }).then((data) => {
      console.log()
      console.log('participant posted')
    })
  }
  leaveAuction () {
    let me = this.state.me 
    this.setState({
      showAuction: false,
      me: null
    })
    axios.delete(`https://pusher-node-auction--ralexrdz.repl.co/participants/${me}`)
    .then((data) => {
      console.log('bye')
    })
  }
  render() {
    return (
      <div id="box">
        <h2 id="winner"> </h2>
        <h1>Auction</h1>
        { this.state.showAuction ?
          (
            <div>
              <h3>La puja más alta es de: <b>{this.state.highestBid}</b></h3>
              <Participants/>
              <div>
                <button onClick={this.leaveAuction.bind(this)}>Abandonar</button>
              </div>
              <Transactions/>
              <Bidder who={this.state.me}/>
            </div>
          ) : (
            <div>
              <input id="name" type="text" placeholder="Nombre"/>
              <button onClick={this.joinAuction.bind(this)}>Participar</button>
              <h2>Escribe tu nombre y da click en participar para unirte a la subasta</h2>
            </div>
          )
        }
      </div>
    )
  }
}

export default Auction
