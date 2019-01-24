import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Sidebar.module.css';
import CareerItem from './CareerItem';

class Sidebar extends Component {
  renderCareers() {
    return Object.keys(this.props.careers).map(key => (
      <div className={css.item} key={key}>
        <CareerItem career={this.props.careers[key]} />
      </div>
    ));
  }

  render() {
    const sidebarClass = classNames({
      [css.container]: !this.props.sidebar,
      [css.containerActive]: this.props.sidebar,
    });

    return (
      <div className={sidebarClass}>
        <div className={css.content}>{this.renderCareers()}</div>
      </div>
    );
  }
}

function mapStateToProps({ careers, sidebar }) {
  return {
    careers,
    sidebar,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Sidebar);
