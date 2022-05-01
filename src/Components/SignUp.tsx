import React, { Component } from 'react';
import Swal from 'sweetalert2';
import UserService from '../Services/user'
import '../Styles/SignUp.css';

type Props = {};
type State = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: number;
	username: string;
};

export default class SignUp extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobileNumber: 0,
      username: ''
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeMobileNumner = this.handleChangeMobileNumner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {firstName, lastName, email, password, mobileNumber, username} = this.state;

    UserService.signUp(firstName, lastName, email, password, mobileNumber, username)
      .then((res): any => {
        const {data} = res;
        if (data.error) {
          return Swal.fire({
            title: 'Error',
            text: data.error
          })
        }
        else if (data._id) {
          return Swal.fire({
            title: 'Success',
            text: 'Account created! You will now be redirected to log in!'
          })
          .then(() => {
            window.location.href = '/'
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

  handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({firstName: e.target.value})
  }
  handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({lastName: e.target.value})
  }
  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({email: e.target.value})
  }
  handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({password: e.target.value})
  }
  handleChangeMobileNumner = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({mobileNumber: +e.target.value})
  }
  handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({username: e.target.value})
  }

  render() {
    return (
      <div className='allContent'>
        <form action="" className='signUpForm' onSubmit={this.handleSubmit}>
            <h1 style={{color: 'rgb(84, 105, 212)'}}>Log in</h1>
          <div className='firstNameSection'>
            
          <label htmlFor="firstName">First Name</label>
          <input type="text" className='input' value={this.state.firstName} onChange={this.handleChangeFirstName}/>
          </div>

          <div className='lastNameSection'>
          <label htmlFor="lastName" >Last Name</label>
          <input type="text" className='input' onChange={this.handleChangeLastName}/>
          </div>

          <div className='emailSection'>
            
          <label htmlFor="email">Email</label>
          <input type="text" className='input' value={this.state.email} onChange={this.handleChangeEmail}/>
          </div>

          <div className='passwordSection'>
          <label htmlFor="password" >Password</label>
          <input type="password" className='input' onChange={this.handleChangePassword}/>
          </div>

          <div className='mobileNumberSection'>
            
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input type="number" className='input' value={this.state.mobileNumber} onChange={this.handleChangeMobileNumner}/>
          </div>

          <div className='usernameSection'>
          <label htmlFor="username">Username</label>
          <input type="text" className='input' onChange={this.handleChangeUsername}/>
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
