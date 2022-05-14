import React, { Component } from 'react';
import ItemService from '../Services/items';
import NavBar from './NavBar';
import UserById from './UserById';
import '../Styles/Home.css';

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

type Props = {}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    ItemService.getAllItems()
      .then((res) => {
        if (res.data.length) {
          this.setState({items: res.data})
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
            </div>
          ))}
        </div>
      </div>
    )
  }
}
