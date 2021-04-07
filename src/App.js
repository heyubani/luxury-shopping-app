import React from 'react';
import data from './data.json';
import Products from './components/products';
import Filter from './components/filter';

//css component
import './App.css';

class App extends React.Component {
	state = {
		products: data.products,
		size: '',
		sort: ''
	};

	sortProduct = (e)  => {
    const sort = e.target.value
		console.log(e.target.value);
    this.setState({
      sort:sort,
      products: this.state.products.slice().sort((a,b) => 
        sort === "lowest" 
        ? a.price > b.price
        ? 1 
        :-1 
        : sort === "highest" 
        ? a.price <  b.price
        ? 1 
        :-1
        : a.price > b.price
        ? 1 
        :-1
      )
    })
	}

	filterProduct = (e) => {
		console.log(e.target.value);
		if (e.target.value === '') {
			this.setState({ size: e.target.value, products: data.products });
		} else {
			this.setState({
				size: e.target.value,
				products: data.products.filter((product) => product.availableSizes.indexOf(e.target.value) >=0)
			});
		}
	};

	render() {
		return (
			<div className="grid-container">
				<header>
					<a href="http://$">Nugget shopping chart</a>
				</header>
				<main>
					<div className="content">
						<div className="main">
							<Filter
								count={this.state.products.length}
								sort={this.state.sort}
								size={this.state.size}
								sortProduct={this.sortProduct}
								filterProduct={this.filterProduct}
							/>
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
