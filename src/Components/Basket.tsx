import React, { Component } from 'react'
import BasketService from '../Services/basket';
import NavBar from './NavBar';
import '../Styles/Basket.css'
import { connect } from "react-redux";
import * as Types from '../store/types'
import { Dispatch } from 'redux';

interface Item {
  name: string;
  seller: string;
  price: number;
  description: string;
  image: string;
  _id: string;
}

type Props = {
  updateAmountOfItemsInBasket: any;
  amountOfItemsInBasket?: number;
};
type State = {
  items: Array<Item>;
};

class Basket extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');

    BasketService.getMyBasket(accessToken)
      .then((res) => {
        const {data} = res;
        if (data.items.length) {
          this.setState({items: data.items})
        }
      })
  }

  removeItem(id: string) {

    const localStorages: any = localStorage.getItem('accessToken');

    BasketService.deleteItemFromBasket(localStorages, id)
      .then((res) => {

        BasketService.getMyBasket(localStorages)
              .then((res) => {
                const {data} = res;
                  this.setState({items: data.items})
                  this.props.updateAmountOfItemsInBasket(data.items.length)
              })
      })
  }
  render() {
    const {items} = this.state;


    return (
      <div>
        <NavBar />
        <h1>Basket</h1>
        <div className='container'> 
        {items.map((el: Item) => (
          <div className='item'>

            <img style={{marginRight: '10px', paddingLeft: '10px'}} src={el.image} alt="item" width="200px" height="200px" className='image'/>
            <div>
            <h4 className='itemProperty'>{el.name}</h4>
            
            <p className='itemProperty'>{el.description}</p>
            <p className='itemProperty'>Quantity: 1</p>

            <p className='itemProperty' style={{color: 'red'}}>£{el.price}</p>
            <button className='itemPropertyButton' onClick={() => this.removeItem(el._id)}>Remove</button>
            </div>
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
export default connectComponent(Basket);
