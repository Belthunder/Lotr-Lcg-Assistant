import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className = "navbar navbar-expand navbar-dark bg-dark">
          <a href="/cards" className="navbar-brand">
            Lotr LCG Assistant
          </a>
          <div className= "navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cards"} className="nav-link">
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CardsList/>}/>
            <Route path="/cards" element={<CardsList/>}/>
            <Route path="/add" element={<AddCard/>}/>
            <Route path="/cards/:id" element={<Card/>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
