import { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import '../Styles/Main.css'

type Props = {};
type State = {
  showLogin: boolean;
  showSignUp: boolean
}

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showLogin: true,
      showSignUp: true
    }
  }

  handleLoginClick = () => {
    this.setState({showLogin: true, showSignUp: false})
  }
  handleSignupClick = () => {
    this.setState({showSignUp: true, showLogin: false})
  }
 
  render() {
    const {showLogin} = this.state;

    return (
      <div>
        <h1 style={{color: 'rgb(84, 105, 212)'}}>E-Commerce App</h1>
        <button onClick={this.handleLoginClick} className="loginButton">Login</button>
        <button onClick={this.handleSignupClick} className="signUpButton">Sign Up</button>
        {showLogin ? (
          <div>
            <Login />
          </div>
        ) : 
        <div>
            <SignUp />
        </div>
        }
        
      </div>
    )
  }
}
export default Main;
