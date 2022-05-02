import React, { Component } from 'react';
import '../Styles/Login.css';
import UserService from '../Services/user';
import Swal from 'sweetalert2';

type Props = {};
type State = {
  email: string;
  password: string;
};

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const {email, password} = this.state

    UserService.login(email, password)
      .then((res): any => {
        const {data} = res;
        if (data.error) {
          return Swal.fire({
            title: 'Error',
            text: 'Invalid login details'
          })
        }
        else if (data.access_token) {
          const {access_token, refresh_token} = data;
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('refreshToken', refresh_token)
          return Swal.fire({
            title: 'Success',
            text: 'You are now logged in! You will be redirected to the homepage'
          })
          .then(() => {
            window.location.href = '/navbar'
          })
        }
        else {
          return Swal.fire({
            title: 'Error',
            text: 'Please try again later'
          })
        }
      })
  }
  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({email: e.target.value})
  }
  handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <div className='allContent'>
        

          <form action="" className='form' onSubmit={this.handleSubmit}>
            <h1 style={{color: 'rgb(84, 105, 212)'}}>Log in</h1>
          <div className='emailSection'>
            
          <label htmlFor="email">Email</label>
          <input type="text" className='input' value={this.state.email} onChange={this.handleChangeEmail}/>
          </div>

          <div className='passwordSection'>
          <label htmlFor="password" >Password</label>
          <input type="password" className='input' onChange={this.handleChangePassword}/>
          </div>

          <button className='loginButton'>Log in</button>
          </form>
      </div>
    )
  }
}

export default Login
