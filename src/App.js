import React from "react";
import Products from "./components/products";
import data from "./data.json"

//css component
import "./App.css"


class App extends React.Component {
  state = {
    products: data.products,
    size:'',
    sort:''
  }

  render() {
    console.log({Products})
  return (
    <div className="grid-container">
      <header>
        <a href="http://$">Nugget shopping chart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={this.state.products} /> 
          </div>
          <div className="cartBar">cart</div>
        </div>  
      </main>
      <footer>All right reserved.</footer>
    </div>
  );
  }
}

export default App;
