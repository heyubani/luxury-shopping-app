import React from 'react';
import data from './data.json';
import Products from './components/products';
import Filter from './components/filter';
import Cart from './components/Cart';
import store from "./store";
import { Provider } from 'react-redux';
 
//css component
import './App.css';

class App extends React.Component {
	state = {
		products: data.products,
		cartItem:
			localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
		size: '',
		sort: ''
	};

	addToCart = (product) => {
		const cartItem = this.state.cartItem.slice();
		let alreadyInCart = false;
		cartItem.forEach((item) => {
			if (item._id === product._id) {
				item.count++;
				alreadyInCart = true;
			}
		});
		if (!alreadyInCart) {
			cartItem.push({ ...product, count: 1 });
		}
		this.setState({ cartItem });
		localStorage.setItem('cartItem', JSON.stringify(cartItem));
	};

	sortProduct = (e) => {
		const sort = e.target.value;
		this.setState({
			sort: sort,
			products: this.state.products.slice().sort(
				(a, b) =>

						sort === 'lowest' ? a.price > b.price ? 1 :
						-1 :
						sort === 'highest' ? a.price < b.price ? 1 :
						-1 :
						a.price > b.price ? 1 :
						-1
			)
		});
	};

	filterProduct = (e) => {
		if (e.target.value === '') {
			this.setState({ size: e.target.value, products: data.products });
		} else {
			this.setState({
				size: e.target.value,
				products: data.products.filter((product) => product.availableSizes.indexOf(e.target.value) >= 0)
			});
		}
	};

	removeFromCart = (product) => {
		const cartItem = this.state.cartItem.slice();
		this.setState({ cartItem: cartItem.filter((item) => item._id !== product._id) });
		localStorage.setItem('cartItem', JSON.stringify(cartItem.filter((item) => item._id !== product._id)));
	};

	checkOutOrder = (order) => {
		alert(`Need to save order for ${order.name}`);
	};
	render() {
		return (
			<Provider store={store}>
			<div className="grid-container">
				<header>
					<a className="header_link" href="http://$">Nugget Luxury chart</a>
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
							<Products products={this.state.products} addToCart={this.addToCart} />
						</div>
						<div className="cartBar">
							<Cart
								cartItem={this.state.cartItem}
								removeFromCart={this.removeFromCart}
								checkOutOrder={this.checkOutOrder}
							/>
						</div>
					</div>
				</main>
				<footer>All right reserved.</footer>
			</div>
			</Provider>
		);
	}
}

export default App;
