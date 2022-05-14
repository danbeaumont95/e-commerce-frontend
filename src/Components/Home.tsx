import React, { Component } from 'react';
import ItemService from '../Services/items';
import BasketService from '../Services/basket';
import NavBar from './NavBar';
import UserById from './UserById';
import '../Styles/Home.css';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import * as Types from '../store/types'
import { Dispatch } from 'redux';

type ItemState = {
  _id: string;
  seller: string;
  description: string;
  name:string;
  price: number;
  image: string;
}

type State = {
  items: ItemState[]
}

type Props = {
  updateAmountOfItemsInBasket: any;
  amountOfItemsInBasket?: number;
};

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: []
    }
    this.addToBasket = this.addToBasket.bind(this)
  }
  componentDidMount() {
    ItemService.getAllItems()
      .then((res) => {
        if (res.data.length) {
          this.setState({items: res.data})
        }
      })
  }

  addToBasket(id: string) {
    const accessToken: any = localStorage.getItem('accessToken');
    BasketService.addItemToBasket(accessToken, id)
      .then((res) => {
        if (res.data.Message) {
          BasketService.getMyBasket(accessToken)
            .then((res) => {
              const {data} = res;
              this.props.updateAmountOfItemsInBasket(data.items.length)
            })
          return Swal.fire({
            title: 'Success',
            text: 'Item added to basket!'
          })
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Please try again'
          })
        }
      })
  }

  render() {

    const {items} = this.state
    return (
      <div>
        <NavBar />
        <div className='items'>

          {items.map((el) => (
            <div className='item'>
              <img src={el.image} alt="item" height="150px" width="120px" className='itemImage'/>
              <h4>{el.name}</h4>
              <p>{el.description}</p>
              <h4 style={{color: 'red'}}>£{el.price}</h4>
              <UserById id={el.seller}/>
              <button onClick={() => this.addToBasket(el._id)}>Add to Basket!</button>
            </div>
          ))}
        </div>
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
export default connectComponent(Home);
