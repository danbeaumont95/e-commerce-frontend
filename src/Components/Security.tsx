import React, { Component } from 'react';
import '../Styles/Security.css';
import UserService from '../Services/user';
import Swal from 'sweetalert2';

type UserState = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username: string,
  mobileNumber: string
}
type Props = {}
type State = {
 user: UserState,
}

class Security extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
        user: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: '',
        mobileNumber: ''
        },
    }
    this.nameSwal = this.nameSwal.bind(this)
  }

  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');

    UserService.getMyDetails(accessToken)
      .then((res) => {
        const {data} = res;
        this.setState({user: data})
      })
  }

changeToPassword(password: string) {
  return password.split('').map(() => '*').join('')
}

nameSwal() {
  Swal.fire({
    title: 'Name Change Form',
    html: `<input type="text" id="firstName" class="swal2-input" placeholder="First Name">
    <input type="text" id="lastName" class="swal2-input" placeholder="Last Name">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    preConfirm: () => {
      const firstName = (document.querySelector('#firstName') as HTMLInputElement).value;

      const lastName = (document.querySelector('#lastName') as HTMLInputElement).value;
      if (!firstName || !lastName) {
        Swal.showValidationMessage(`Please enter first name and last name`)
      }
      return { firstName, lastName }
    }
  }).then((result) => {
    if (result.isDismissed) {
     return null
    }
    const {value} = result;

    const firstName = value?.firstName;
    const lastName = value?.lastName
    const detailsToUpdate = {firstName, lastName}

    const accessToken: any = localStorage.getItem('accessToken');

    UserService.updateMyDetails(accessToken,detailsToUpdate)
      .then((res) => {
        const {data}: {data: UserState} = res;
        if (data.firstName) {
          this.setState({user: data})
        }
      })
      .then(() => {
        return Swal.fire({
          title: 'Success!',
          text: 'Details updated'
        })
      })
  })
}

  render() {
    return (
      <div className='allSecurityContent'>
        <h2>Security</h2>
        <div className='updateSecurityDetailsContainer'>
          <ul style={{paddingRight:20, paddingLeft:20 }}>
            <li style={{listStyleType: 'none', borderBottom: '1px solid #e7e7e7', width: '100%'}}>
              <span className='securityDetailsItem'>
                <div className='securityDetails'>
                  <div>

                  <p style={{marginTop: 0}}>Name</p>
                  <p>{this.state.user.firstName} {this.state.user.lastName}</p>
                  </div>
                  <button className='editSecurityDetailsButton' onClick={this.nameSwal}>Edit</button>
                </div>
              </span>
            </li>
            <li style={{listStyleType: 'none', borderBottom: '1px solid #e7e7e7'}}>
              <span className='securityDetailsItem'>
                <div className='securityDetails'>
                  <div>

                  <p style={{marginTop: 0}}>Email</p>
                  <p>{this.state.user.email}</p>
                  </div>
                  <button className='editSecurityDetailsButton'>Edit</button>
                </div>
              </span>
            </li>
            <li style={{listStyleType: 'none', borderBottom: '1px solid #e7e7e7'}}>
              <span className='securityDetailsItem'>
                <div className='securityDetails'>
                  <div>

                  <p style={{marginTop: 0}}>Mobile phone number</p>
                  <p>{this.state.user.mobileNumber}</p>
                  </div>
                  <button className='editSecurityDetailsButton'>Edit</button>
                </div>
              </span>
            </li>
            <li style={{listStyleType: 'none'}}>
              <span className='securityDetailsItem'>
                <div className='securityDetails'>
                  <div>

                  <p style={{marginTop: 0}}>Password</p>
                  <p>{this.changeToPassword(this.state.user.password)}</p>
                  </div>
                  <button className='editSecurityDetailsButton'>Edit</button>
                </div>
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Security
