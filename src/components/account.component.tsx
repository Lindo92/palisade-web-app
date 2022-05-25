import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import AccountsService from '../services/accounts.service';
const Account: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialAccountState = {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    roles: [],
  };
  const [currentAccount, setCurrentAccount] = useState<any>(initialAccountState);
  const [message, setMessage] = useState<string>("");

  const getAccount = (id: string) => {
    AccountsService.getOneAccountByIdAdmin(id)
      .then((response: any) => {
        setCurrentAccount(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getAccount(id);
  }, [id]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentAccount({ ...currentAccount, [name]: value });
  };
  const updateAccount = () => {
    AccountsService.updateAccountUser(currentAccount._id, currentAccount)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The account was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteAccount = () => {
    AccountsService.deleteAccountAdmin(currentAccount.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/entries");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (<div>
    {currentAccount ? (
      <div className="edit-form text-white">
        <h4>Account</h4>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={currentAccount.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={currentAccount.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={currentAccount.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={currentAccount.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roles">Authorities</label>
            <input
              type="text"
              className="form-control"
              id="roles"
              name="roles"
              value={currentAccount.roles}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button className="badge badge-danger mr-2" onClick={deleteAccount}>
          Delete
        </button>
        <button
          type="submit"
          className="badge badge-success"
          onClick={updateAccount}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Account...</p>
      </div>
    )}
  </div>);
};
export default Account;