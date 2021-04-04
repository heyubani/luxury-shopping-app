import React, { Component } from 'react';
import Format from "./utility"
export default class Products extends Component {
	render() {
		return (
			<div>
				<ul className="products">
					{this.props.products.map(items => (
					<li key={items._id}>
							<div className="product">
								<a href={"#" + items._id}>
									<img src={items.image} alt={items.title}/>
									<p>
										{items.title}
									</p>
								</a>
									<div className="product-price">
                                       <div>
										   {Format(items.price)}
									   </div>
									   <button className="btn primary">
										   Add to cart
									   </button>
									</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
