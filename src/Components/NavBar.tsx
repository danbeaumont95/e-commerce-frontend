import React, { Component } from 'react';
import '../Styles/NavBar.css';
import BasketService from '../Services/basket';
import Swal from 'sweetalert2';
import {ShoppingCart} from '@mui/icons-material';
type Props = {};
type State = {
  itemsInBasket: number;
  isLoading: boolean;
}

export default class NavBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      itemsInBasket: 0,
      isLoading: true
    }
  }
 
  componentDidMount() {
    const localStorages: any = localStorage.getItem('accessToken');

    BasketService.getAmountOfItemsInBasket(localStorages)
      .then((res) => {
        const {data} = res

        if (data.error) {
          return Swal.fire({
            title: 'Error',
            text: data.error
          })
          .then(() => {
            window.location.href = '/'
          })
        }
        else {
          this.setState({itemsInBasket: data.amount, isLoading: false})
        }

      })
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : 

      <div className='navbar'>
        <h3 className='title'>Dans e-commerce app</h3>
        <ul className='nav-links'>

        <a href="/profile" className='nav-item'>Profile</a>
        <a href="/basket"className='nav-item'>
          <ShoppingCart />
          {this.state.itemsInBasket}
          </a>

        </ul>
      </div>
      }
      </div>
    )
  }
}
