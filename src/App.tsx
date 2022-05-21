import { Component } from "react";
import { Routes, Route,  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import NavBar from "./components/navbar.component";
import AddEntry from "./components/add-entry.component";
import EntriesList from "./components/list-entries.components";
import Entry from "./components/Entry.component";
import AccountsList from "./components/list-accounts.component";

class App extends Component<{}, {}> {
  render() {

    return (
      <div>
        <NavBar></NavBar>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/add" element={<AddEntry/>} />
            <Route path="/entries" element={<EntriesList/>} />
            <Route path="/entries/:id" element={<Entry/>} />
            <Route path="/accounts" element={<AccountsList/>} />
          </Routes>
        </div>

      </div>
    );
  }
}

export default App;