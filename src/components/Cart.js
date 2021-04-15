import React, { Component } from 'react';
import Formate from './utility';

export default class Cart extends Component {
	state = {
		name: '',
		email: '',
		address: '',
		showCheckOut: false
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	checkOutOrder = (e) => {
		e.preventDefault();
		const order = {
			name: this.state.name,
			email: this.state.email,
			address: this.state.address,
			cartItem: this.props.cartItem
		};
		this.props.checkOutOrder(order);
	};

	render() {
		const { cartItem } = this.props;

		return (
			<div>
				<div>
					{
						cartItem.length === 0 ? <div className="cart cart-header"> Cart is empty</div> :
						<div className="cart cart-header">you have {cartItem.length} in your cart</div>}
				</div>
				<div className="cart">
					<ul className="cart-items">
						{cartItem.map((item) => (
							<li key={item._id}>
								<div>
									<img src={item.image} alt={item.title} />
								</div>
								<div>
									<div>{item.title}</div>
									<div className="right">
										{Formate(item.price)} x {item.count} {' '}
										<button className="btn" onClick={() => this.props.removeFromCart(item)}>
											Remove
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>

				{cartItem.length !== 0 && (
					<div>
						<div className="cart">
							<div className="total">
								Total: {Formate(cartItem.reduce((a, c) => a + c.price * c.count, 0))} {' '}
								<button onClick={() => this.setState({ showCheckOut: true })} className="btn primary">
									proceed
								</button>
							</div>
						</div>
						{this.state.showCheckOut && (
							<div className="cart">
								<form onSubmit={this.checkOutOrder}>
									<ul className="form-container">
										<li>
											<label>name</label>
											<input 
											type="text" 
											name="name" 
											required 
											onChange={this.handleInput} />
										</li>
										<li>
											<label>Email</label>
											<input 
											type="email" 
											name="email" 
											required
											onChange={this.handleInput} />
										</li>
										<li>
											<label>Address</label>
											<input 
											type="text" 
											name="address" 
											required 
											onChange={this.handleInput} />
										</li>
										<li>
											<button className="btn primary" type="submit">
												Checkout
											</button>
										</li>
									</ul>
								</form>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}
