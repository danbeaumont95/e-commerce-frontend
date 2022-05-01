import React, { Component } from 'react';
import '../Styles/Login.css'

export default class Login extends Component {

  render() {
    return (
      <div className='allContent'>
        <h1 style={{color: 'rgb(84, 105, 212)'}}>E-Commerce App</h1>


          <form action="" className='form'>
            <h1 style={{color: 'rgb(84, 105, 212)'}}>Log in</h1>
          <div className='emailSection'>
            
          <label htmlFor="email">Email</label>
          <input type="text" className='input'/>
          </div>

          <div className='passwordSection'>
          <label htmlFor="password" >Password</label>
          <input type="password" className='input'/>
          </div>

          <button className='loginButton'>Log in</button>
          <div className='signUpOption'>

          <h4>Don't have an account?</h4>
          <h4 style={{ marginLeft: '.3rem', color: 'blue', cursor: 'pointer' }}>Sign up</h4>
          </div>
          </form>
      </div>
    )
  }
}
