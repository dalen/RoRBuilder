import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import css from '../css/components/Breadcrumb.module.css';
import { gaChangeCareer } from '../helpers/googleAnalytics';

import IconChevronRight from '../icons/IconChevronRight';

import { toggleOverlay } from '../actions/actionOverlay';
import { toggleSidebar } from '../actions/actionSidebar';

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.clickBreadcrumb = this.clickBreadcrumb.bind(this);
  }

  clickBreadcrumb(e) {
    e.preventDefault();
    this.props.toggleOverlay(!this.props.overlay);
    this.props.toggleSidebar(!this.props.sidebar);
    gaChangeCareer('Breadcrumb');
  }

  render() {
    const career = this.props.careers[this.props.slug];

    return (
      <div>
        <span className={css.Breadcrumb}>
          <Link to="/" className={css.BreadcrumbLink}>
            Home
          </Link>
        </span>
        <span className={css.BreadcrumbDivider}>
          <IconChevronRight
            classes="icon--small"
            name="right chevron icon"
            nameSlug="right-chevron-icon"
          />
        </span>
        <span className={css.Breadcrumb}>
          <a
            href="#"
            onClick={this.clickBreadcrumb}
            className={css.BreadcrumbLink}
          >
            {career.faction}
          </a>
        </span>
        <span className={css.BreadcrumbDivider}>
          <IconChevronRight
            classes="icon--small"
            name="right chevron icon"
            nameSlug="right-chevron-icon"
          />
        </span>
        <span className={css.Breadcrumb}>
          <a
            href="#"
            onClick={this.clickBreadcrumb}
            className={css.BreadcrumbLink}
          >
            {career.race}
          </a>
        </span>
        <span className={css.BreadcrumbDivider}>
          <IconChevronRight
            classes="icon--small"
            name="right chevron icon"
            nameSlug="right-chevron-icon"
          />
        </span>
        <span className={css.BreadcrumbActive}>{career.class}</span>
      </div>
    );
  }
}

function mapStateToProps({ careers, sidebar, overlay, slug }) {
  return {
    careers,
    sidebar,
    overlay,
    slug,
  };
}

export default connect(
  mapStateToProps,
  { toggleOverlay, toggleSidebar },
)(Breadcrumb);
