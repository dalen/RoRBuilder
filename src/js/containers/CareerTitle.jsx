import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../css/components/CareerTitle.css';

class CareerTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const career = this.props.careers[this.props.slug];
    const url = `/images/icons/${career.slug}.png`;
    return (
      <div className="row row--v-center">
        <img src={url} className={css.icon} />
        <h1 className={css.title}>{career.name}</h1>
      </div>
    );
  }
}

function mapStateToProps({ slug, careers }) {
  return {
    slug,
    careers,
  };
}

export default connect(
  mapStateToProps,
  null,
)(CareerTitle);
