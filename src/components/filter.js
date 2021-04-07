import React, { Component } from 'react';

export default class Filter extends Component {
	render() {
		return (
			<div className="filter">
				<div className="filter-result">{this.props.count} products</div>
				<div className="filter-sort">
					Order
					<select value={this.props.sort} onChange={this.props.sortProduct}>
						<option value="">Latest</option>
						<option value="Lowest">lowest</option>
						<option value="highest">Highest</option>
					</select>
				</div>
				<div className="filter-size">
					Filter
					<select value={this.props.size} onChange={this.props.filterProduct}>
						<option value="">All</option>
						<option value="X">X</option>
						<option value="L">L</option>
						<option value="XL">XL</option>
					</select>
				</div>
			</div>
		);
	}
}
