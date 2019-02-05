import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import css from '../css/components/CareerItem.module.css';
import { gaCareerSelected } from '../helpers/googleAnalytics';

import { toggleOverlay } from '../actions/actionOverlay';
import { toggleSidebar } from '../actions/actionSidebar';

class CareerItem extends Component {
  constructor(props) {
    super(props);
    this.clickItem = this.clickItem.bind(this);
  }

  clickItem() {
    // Send event to Google Analytics
    gaCareerSelected(
      this.props.career.name,
      this.props.career.class,
      this.props.career.race,
    );
    // Hide sidebar and overlay
    this.props.toggleSidebar(false);
    this.props.toggleOverlay(false);
  }

  render() {
    const { career } = this.props;
    const url = `/career/${career.slug}`;
    const imgUrl = `/images/icons/${career.slug}.png`;
    return (
      <div className={css.item}>
        <Link to={url} onClick={this.clickItem}>
          <img alt={career.name} src={imgUrl} className={css.icon} />
        </Link>
        <Link className={css.link} to={url} onClick={this.clickItem}>
          {career.name}
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ sidebar, overlayShow }) {
  return {
    sidebar,
    overlayShow,
  };
}

export default connect(
  mapStateToProps,
  {
    toggleOverlay,
    toggleSidebar,
  },
)(CareerItem);
