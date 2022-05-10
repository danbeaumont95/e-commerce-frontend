import React, { Component } from 'react';
import AddressService from '../Services/address';
import NavBar from './NavBar';
import '../Styles/Account.css';

type AddressState = {
    firstLine: string;
    secondLine: string;
    TownCity: string;
    Postcode: string;
    Country: string;
}
type State = {
  addresses: AddressState[]
};

type Props = {};

export default class Addresses extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addresses: []
    }
  }
  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');
    AddressService.getMyAddresses(accessToken)
      .then((res) => {
        const {data} = res;
        const {addresses}: {addresses: AddressState[]} = data
        this.setState({addresses})
      })
  }

  render() {
    return (
      <div className='allContent'>
      <NavBar />
      <h1>Addresses</h1>
      <div className="grid">
      {this.state.addresses.map((el) => (


          <div className='card'>
            <div className="text">
              <address>

              <p>{el.firstLine}</p>
              <p>{el.secondLine}</p>
              <p>{el.TownCity}</p>
              <p>{el.Postcode}</p>
              <p>{el.Country}</p>
              </address>
            </div>

          </div>
      ))}
      </div>
      </div>
    )
  }
}
