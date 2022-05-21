import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: any
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {}
    };
  }

  async componentDidMount() {
    const currentUser = await AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate replace to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    console.log(currentUser);
    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{`${currentUser.username}'s`}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser._id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
            <p>
              <strong>First Name:</strong>{" "}
              {currentUser.firstname}
            </p>
            <p>
              <strong>Last Name:</strong>{" "}
              {currentUser.lastname}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role: any, index: any) => <li key={index}>{role}</li>)}
            </ul>
          </div> : null}
      </div>
    );
  }
}