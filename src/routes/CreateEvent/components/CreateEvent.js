import React, { Component } from 'react'
import './CreateEvent.scss'

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: null, // TODO: Force to int
      price: null // TODO: Force to int
    };
  }

  onSubmit() {
    this.props.createEvent(this.state.name, this.state.qty, this.state.price)
      .then(() => {

      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className='container' >
        <h1>Create Event</h1>
        <label className='label'>
          <span>Event Name:</span>
          <input type="text" value={this.state.name} onChange={(e) => {
            this.setState({name: e.target.value});
          }} />
        </label>
        <label className='label'>
          <span>Qty:</span>
          <input type="text" value={this.state.qty} onChange={(e) => {
            this.setState({qty: e.target.value})
          }} />
        </label>
        <label className='label'>
          <span>Price:</span>
          <input type="text" value={this.state.price} onChange={(e) => {
            this.setState({price: e.target.value})
          }} />
        </label>
        <span className='error'>{(this.props.loginError) ? this.props.loginError : null}</span>
        <span className='user'>{(this.props.user) ? this.props.user : null}</span>
        <button onClick={this.handleSubmit}>Create Event</button>
      </div>
    )
  }
}

export default CreateEvent
