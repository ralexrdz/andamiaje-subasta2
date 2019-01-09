import React, { Component } from 'react'
import axios from 'axios'

import './Bidder.css';


class Bidder extends Component {
  constructor (props) {
    super(props)
  }
  bid () {
    console.log(this.props)
    let who = this.props.who
    let amount = parseInt(document.getElementById('bid').value)
    axios.post('https://hanc.serveo.net/bids', {
      name: who,
      amount: amount
    })
    .then( function (data) {
      console.log(data)
      console.log(`${who} bids ${amount}` )
    })
  }
  render() {
    return (
      <div id="box">
        <h1>Bidder</h1>
        <div>
          <label htmlFor="bid">Cantidad: </label><input type="number" id="bid"/>
          <button onClick={this.bid.bind(this)}>Pujar</button>
        </div>
      </div>
    )
  }
}

export default Bidder
