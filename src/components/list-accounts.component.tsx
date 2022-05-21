import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import AccountsService from "../services/accounts.service";
const AccountsList: React.FC = () => {
  const [accounts, setAccounts] = useState<Array<any>>([]);
  const [currentAccount, setCurrentAccount] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchUsername, setSearchUsername] = useState<string>("");

  useEffect(() => {
    retrieveAccounts();
  }, []);
  const onChangeSearchUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const searchUsername = e.target.value;
    setSearchUsername(searchUsername);
  };
  const retrieveAccounts = () => {
    AccountsService.getAllAccountsAdmin()
      .then((response: any) => {
        setAccounts(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveAccounts();
    setCurrentAccount(null);
    setCurrentIndex(-1);
  };
  const setActiveAccount = (account: any, index: number) => {
    setCurrentAccount(account);
    setCurrentIndex(index);
  };
  const removeAccountById = (id: string) => {
    AccountsService.deleteAccountAdmin(id)
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const findByUserName = () => {
    AccountsService.getAccountsUsernameAdmin(searchUsername)
      .then((response: any) => {
        setAccounts(response.data);
        setCurrentAccount(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (  <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username"
            value={searchUsername}
            onChange={onChangeSearchUsername}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByUserName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Accounts List</h4>
        <ul className="list-group">
          {accounts &&
            accounts.map((account, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAccount(account, index)}
                key={index}
              >
                {account.username}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentAccount ? (
          <div>
            <h4>Account</h4>
            <div>
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentAccount.username}
            </div>
            <div>
              <label>
                <strong>First Name:</strong>
              </label>{" "}
              {currentAccount.firstname}
            </div>
            <div>
              <label>
                <strong>Last Name:</strong>
              </label>{" "}
              {currentAccount.lastname}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentAccount.email}
            </div>
            <div>
                            <label>
                <strong>Authorities:</strong>
              </label>{" "}
             <ul>
              {currentAccount.roles &&
                currentAccount.roles.map((role: any, index: any) => <li key={index}>{role}</li>)}
            </ul>
            </div>
            <Link
              to={"/accounts/" + currentAccount._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
            <button onClick={() => removeAccountById(currentAccount._id)} className="=m-3 btn btn-sm btn-danger">
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Account...</p>
          </div>
        )}
      </div>
    </div> )
};
export default AccountsList;