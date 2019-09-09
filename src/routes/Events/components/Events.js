import React, { Component } from 'react'
import classNames from 'classnames';
import ReactModal from 'react-modal';

import './Events.scss'

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedEvent: null,
      events: []
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
  }

  componentDidMount() {
    this.props.getContractInfo()
      .then((data) => {
        this.props.getEvents();
      });
  }

  buyTicket(event) {
    this.setState({isLoading: true});
    this.props.buyTicket(event);
    // TODO: Some stuff
    //.then(() => this.setState({ isLoading: false }))
  }

  renderListItem(item, index) {
    return (
      <tr key={item.id} className={classNames('eventRow', {'odd': (index%2 == 0)})}>
        <td style={{flex: 2}}>{item.name}</td>
        <td>{item.price} ETH</td>
        <td>{item.qty} Left</td>
        <td><button onClick={() => {
          this.setState({'buyModalOpen': true, selectedEvent: item })
        }}>Buy Ticket</button></td>
      </tr>
    )
  }

  render() {
    return (
      <div className='events-container' >
        <table>
          <th>
            <td style={{flex: 2}}>Name</td>
            <td>Price</td>
            <td>Qty Remaining</td>
            <td>Buy</td>
          </th>
          <tbody>
            {this.props.events.map((event, index) => {
              return this.renderListItem(event, index);
            })}
          </tbody>
        </table>
        <ReactModal
          isOpen={this.state.buyModalOpen}
          contentLabel="Payment Modal"
          onRequestClose={() => {
            if(!this.state.isLoading) {
              this.setState({buyModalOpen: false})
            }
          }}
          style={require('./modal-styles.js').default}
        >
          <h2 className="checkout-header">Buy a Ticket</h2>
          <div className="event-details">
            <span className="event-header">Event Details</span>
            <span className='event-name'><b>Name:</b> {this.state.selectedEvent && this.state.selectedEvent.name}</span>
            <span className='event-price'><b>Price:</b> {this.state.selectedEvent && this.state.selectedEvent.price} ETH</span>
            <button
              className={classNames('purchase-ticket', {isLoading: this.state.isLoading, notLoading: !this.state.isLoading })}
              onClick={() => this.buyTicket(this.state.selectedEvent)}>{(this.state.isLoading) ? <img src={require('../../../layouts/assets/img/spinner.svg')} />
              : 'Confirm Purchase'}</button>
          </div>
        </ReactModal>
      </div>
    )
  }
}

export default Events
