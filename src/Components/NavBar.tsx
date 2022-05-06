import React, { Component } from 'react';
import '../Styles/NavBar.css';
import BasketService from '../Services/basket';
import Swal from 'sweetalert2';
import {ShoppingCart} from '@mui/icons-material';
import { connect } from "react-redux";
import * as Types from '../store/types'
import { Dispatch } from 'redux';

type Props = {
  updateAmountOfItemsInBasket: any;
  amountOfItemsInBasket: number;
};
type State = {
  amountOfItemsInBasket: number;
  isLoading: boolean;
}

class NavBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      amountOfItemsInBasket: 0,
      isLoading: true
    }
  }
  
  componentDidMount() {

    const localStorages: any = localStorage.getItem('accessToken');
    
    BasketService.getAmountOfItemsInBasket(localStorages)
    .then((res) => {
      const {data} = res;
      
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
        this.props.updateAmountOfItemsInBasket(data.amount)
        this.setState({amountOfItemsInBasket: data.amount, isLoading: false})
      }
    })
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.amountOfItemsInBasket !== this.props.amountOfItemsInBasket) {
      this.setState({amountOfItemsInBasket: this.props.amountOfItemsInBasket})
    }
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

        <a href="/account" className='nav-item'>Account</a>
        <a href="/basket"className='nav-item'>
          <ShoppingCart />
          {this.state.amountOfItemsInBasket}
          </a>

        </ul>
      </div>
      }
      </div>
    )
  }
}


const mapStateToProps = (state: State )=> state;
const mapDispatchToProps = (dispatch: Dispatch) => ({

  updateAmountOfItemsInBasket: (amountOfItemsInBasket: number) => dispatch({
    type: Types.UPDATE_AMOUNT_OF_ITEMS_IN_BASKET, payload: {
      amountOfItemsInBasket
    }
  })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(NavBar);
