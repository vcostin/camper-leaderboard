import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FetchCampers extends Component {

  activeClassName() {
    return this.props.isActive ? 'active' : '';
  }

  render() {
    return (
      <div
        tabIndex={0}
        role="button"
        onClick={this.props.getData}
        className={this.activeClassName()}
      >{this.props.text}{this.props.isActive && <i className="fa fa-check" aria-hidden="true"></i>}
      </div>
    );
  }
}

FetchCampers.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
};

export default FetchCampers;
