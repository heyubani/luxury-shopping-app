import React, { Component } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Zoom } from 'react-awesome-reveal';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productionActions';

import Format from './utility';

class Products extends Component {
	state = {
		items: null
	};

	componentDidMount(){
		this.props.fetchProducts()
	}
	openModal = (Items) => {
		this.setState({ Items });
	};

	closeModal = () => {
		this.setState({ Items: false });
	};

	render() {
		const { Items } = this.state;
		return (
			<div>
				<Fade direction="down" cascade="true">
					{
						!this.props.products ? (
							<div>Loading...</div>
						) : (
							<ul className="products">
						{this.props.products.map((Items) => (
							<li key={Items._id}>
								<div className="product">
									<a href={'#' + Items._id} onClick={() => this.openModal(Items)}>
										<img src={Items.image} alt={Items.title} width="300" height="300" />
										<p>{Items.title}</p>
									</a>
									<div className="product-price">
										<div>{Format(Items.price)}</div>
										<button onClick={() => this.props.addToCart(Items)} className="btn primary">
											Add to cart
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
						)
					}
					
				</Fade>
				{Items && (
					<Modal isOpen={true} onRequestClose={this.closeModal}>
						<Zoom>
							<button className="closeModal" onClick={this.closeModal}>
								X
							</button>
							<div className="product-details">
								<img src={Items.image} alt={Items.title} />
								<div className="product-discription">
									<p>
										<strong>{Items.title}</strong>
									</p>
									<p>{Items.discription}</p>
									<p>
										Available : {''}
										{Items.availableSizes.map((x) => (
											<span>
												{' '}
												<button className="button">{x}</button>
											</span>
										))}
									</p>
									<div className="product-price">
										<div>
											<div>{Format(Items.price)}</div>
											<button
												className="btn primary"
												onClick={() => {
													this.props.addToCart(Items);
													this.closeModal();
												}}
											>
												Add to cart
											</button>
										</div>
									</div>
								</div>
							</div>
						</Zoom>
					</Modal>
				)}
			</div>
		);
	}
}


export default connect((state)=>({products: state.products.items}),{
	fetchProducts,
})(Products)