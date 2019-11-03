import React from 'react';
import { connect } from 'react-redux';
import css from '../css/components/CareerTitle.module.css';

const CareerTitle = ({ careers, slug }) => {
  const career = careers[slug];
  const url = `/images/icons/${career.slug}.png`;
  return (
    <div className="row row--v-center">
      <img alt={`Career icon ${career.name}`} src={url} className={css.icon} />
      <h1 className={css.title}>{career.name}</h1>
    </div>
  );
};

function mapStateToProps({ slug, careers }) {
  return {
    slug,
    careers,
  };
}

export default connect(mapStateToProps)(CareerTitle);
