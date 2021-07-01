import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import css from '../css/components/Breadcrumb.module.css';
import { gaChangeCareer } from '../helpers/googleAnalytics';

import IconChevronRight from '../icons/IconChevronRight';

import { toggleOverlay } from '../actions/actionOverlay';
import { toggleSidebar } from '../actions/actionSidebar';

import { State } from '../reducers';

function mapStateToProps({ careers, sidebar, overlay, slug }: State) {
  return {
    careers,
    sidebar,
    overlay,
    slug,
  };
}

const mapDispatchToProps = { toggleOverlay, toggleSidebar };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Breadcrumb extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.clickBreadcrumb = this.clickBreadcrumb.bind(this);
  }

  clickBreadcrumb(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    this.props.toggleOverlay(!this.props.overlay);
    this.props.toggleSidebar(!this.props.sidebar);
    gaChangeCareer('Breadcrumb');
  }

  render() {
    if (!this.props.slug) {
      return <div>No class selected</div>;
    }

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
          {/* eslint-disable-next-line */}
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
          {/* eslint-disable-next-line */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
