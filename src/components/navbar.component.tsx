import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";

import EventBus from "../common/EventBus";
type Props = {};

type State = {
  currentUser: any
}

class NavBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  async componentDidMount() {
    const user = await AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Palisade
          </Link>

          {currentUser ? (
          <>
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/entries"} className="nav-link">
                  Entries
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Entries
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/accounts"} className="nav-link">
                  Accounts
                </Link>
              </li>
            </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {`${currentUser.username}'s profile`}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          </>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

export default NavBar;