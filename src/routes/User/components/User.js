import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import web3 from '../../../components/Web3.js'
import './User.scss'


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: null, // TODO: Force to int
      price: null, // TODO: Force to int
      tickets: [],
      events: [],
      balance: null
    };
  }

  componentDidMount() {
    this.props.getUserEvents();
    // this.props.getTickets();
    this.props.getUserBalance();
    console.log('prerps: ', this.props);
  }

  renderTickets() {
    return (
      <span>{this.state.tickets}</span>
    )
  }

  renderEvents() {
    return (
      <span>events</span>
    )
  }

  renderBalance() {
    return (
      <span>{this.props.balance}</span>
    )
  }

  render() {
    const { username, walletAddress, privateKey } = this.props.user;
    const { balance } = this.props;
    console.log('User.js this.props: ', this.props);
    return (
      <div className='container' >
        <h1>User</h1>
        <div className="profile-info">
          <span className='profile-item'>Name: {username}</span>
          <span className='profile-item'>Wallet Address: {walletAddress}</span>
          <span className='profile-item'>Private Key: {privateKey}</span>
          <span className='profile-item'><b>Balance: {balance} ETH</b></span>
        </div>

        <Tabs>
          <TabList>
            <Tab>Tickets</Tab>
            <Tab>Events</Tab>
          </TabList>

          <TabPanel>
            <h2>Tickets</h2>
            {this.renderTickets()}
          </TabPanel>
          <TabPanel>
            <h2>Events</h2>
            {this.renderEvents()}
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default User
