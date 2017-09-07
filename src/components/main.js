"use strict"

import React from 'react';
import Menu from './menu.js';
import Footer from './footer.js';
import {connect} from 'react-redux';

class Main extends React.Component {
	render = () => {
		return (
			<div>
				<Menu cartItemsNumber={this.props.totalQuantity} />
				{this.props.children}
				<Footer />
			</div>
		)
	}
}
const mapsStateToProps = (state) => {
	return {
		totalQuantity: state.cart.totalQuantity
	}
}

export default connect(mapsStateToProps)(Main);
