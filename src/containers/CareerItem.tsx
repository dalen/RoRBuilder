import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import css from '../css/components/CareerItem.module.css';
import { gaCareerSelected } from '../helpers/googleAnalytics';

import { toggleOverlay } from '../actions/actionOverlay';
import { toggleSidebar } from '../actions/actionSidebar';

import { State } from '../reducers';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { career: any };

class CareerItem extends Component<Props> {
  constructor(props: Props) {
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

function mapStateToProps({ sidebar, overlay }: State) {
  return {
    sidebar,
    overlay,
  };
}

const mapDispatchToProps = {
  toggleOverlay,
  toggleSidebar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CareerItem);
