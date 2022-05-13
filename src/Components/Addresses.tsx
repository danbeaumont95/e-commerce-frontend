import React, { Component } from 'react';
import AddressService from '../Services/address';
import NavBar from './NavBar';
import Swal from 'sweetalert2';
import '../Styles/Account.css';

type AddressState = {
    firstLine: string;
    secondLine: string;
    TownCity: string;
    Postcode: string;
    Country: string;
    id: string;
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
  handleAddressClick(el: AddressState) {
    Swal.fire({
      title: 'Address change form',
      html: `
      <label for="first_line">First Line</label>
      <input type="text" id="firstLine" value="${el.firstLine}" class="swal2-input" placeholder="First Line">
      <label for="second_line">Second Line</label>
      <input type="text" id="secondLine" value="${el.secondLine}" class="swal2-input" placeholder="Second Line">
      <label for="town_city">Town/City</label>
      <input type="text" id="TownCity" value="${el.TownCity}" class="swal2-input" placeholder="Town/City">
      <label for="postcode">Postcode</label>
      <input type="text" id="Postcode" value="${el.Postcode}" class="swal2-input" placeholder="Postcode">
      <label for="Country">Country</label>
      <input type="text" id="Country" value="${el.Country}" class="swal2-input" placeholder="Country">
      `,
      confirmButtonText: 'Update address',
      focusConfirm: false,
      buttonsStyling: false,
      customClass: {
        confirmButton: "swalButton"
      },
      preConfirm: () => {
        const firstLine = (document.querySelector('#firstLine') as HTMLInputElement).value;

        const secondLine = (document.querySelector('#secondLine') as HTMLInputElement).value;
        const townCity = (document.querySelector('#TownCity') as HTMLInputElement).value;

        const postcode = (document.querySelector('#Postcode') as HTMLInputElement).value;
        const country = (document.querySelector('#Country') as HTMLInputElement).value;


        if (!firstLine || !secondLine || !townCity || !postcode || !country) {
          Swal.showValidationMessage(`Please enter address details`)
        }
        return { firstLine, secondLine, townCity, postcode, country }
      }
    })
    .then((result) => {
      if (result.isDismissed) {
        return null
       }
      const {value} = result;
      const firstLine = value?.firstLine
      const secondLine = value?.secondLine
      const TownCity = value?.townCity
      const Postcode = value?.postcode
      const Country = value?.country
      const detailsToUpdate = {
        firstLine,
        secondLine,
        TownCity,
        Postcode,
        Country
      }

      const accessToken: any = localStorage.getItem('accessToken');
      AddressService.updateMyAddress(accessToken, detailsToUpdate, el.id)
        .then((res) => {
          if (res.data.Message) {
            AddressService.getMyAddresses(accessToken)
              .then((res) => {
                this.setState({addresses: res.data.addresses})
                return Swal.fire({
                  title: 'Success',
                  text: 'Address updated'
                })
              })
          }
          else {
            return Swal.fire({
              title: 'Error',
              text: 'Error updating address'
            })
          }
        })
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
              <button onClick={() => this.handleAddressClick(el)}>Edit</button>
            </div>

          </div>
      ))}
      </div>
      </div>
    )
  }
}
