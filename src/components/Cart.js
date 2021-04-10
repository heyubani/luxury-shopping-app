import React, { Component } from 'react';
import Formate from './utility';
class Cart extends Component {
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
					<div className="cart">
						<div className="total">
							Total:  {Formate(cartItem.reduce((a, c) => a + c.price * c.count, 0))} {' '}
							<button className="btn primary">proceed</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Cart;
