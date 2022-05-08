import React, { Component } from 'react';
import NavBar from './NavBar';
import '../Styles/Account.css'

type Props = {}
type State = {}

class Account extends Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = {
      user: []
    }
  }

  handleClick(param: string) {
    window.location.href = `/account/${param}`;
  }

  render() {
    return (
      <div className='allContent'>
        <NavBar />
        <h1>Account</h1>
          <div className="grid">

            <div className='card' onClick={() => this.handleClick('security')}>
              <div className="text">
                <h3>Login and Security</h3>
                <p>Edit login, name and phone number</p>
              </div>

            </div>
            <div className='card' onClick={() => this.handleClick('addresses')}>
              <div className="text">
                <h3>Your addresses</h3>
                <p>Edit your addresses for delivery preferences</p>
              </div>

            </div>
            <div className='card' onClick={() => this.handleClick('orders')}>
              <div className="text">
                <h3>Your orders</h3>
                <p>Track your orders</p>
              </div>
            </div>

          </div>
    </div>
    )
  }
}

export default Account;
