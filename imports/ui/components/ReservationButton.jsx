import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class ReservationButton extends Component {
    render() {
        return (
            <Link to={this.props.href}>
              <button className="button button-block button-dark">
                Book a Table
              </button>
            </Link>
        );
    }
}
ReservationButton.propTypes = {
    href: PropTypes.string
}
