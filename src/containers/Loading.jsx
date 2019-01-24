import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Loading.module.css';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const containerClass = classNames({
      [css.container]: !this.props.sidebar,
      [css.containerSidebar]: this.props.sidebar,
    });

    return (
      <div className={containerClass}>
        <div className={css.icon} />
        <span className={css.title}>Loading...</span>
      </div>
    );
  }
}

function mapStateToProps({ sidebar }) {
  return {
    sidebar,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Loading);
