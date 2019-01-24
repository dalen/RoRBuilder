import React from 'react';
import { connect } from 'react-redux';
import css from '../css/components/CareerUpdated.module.css';

const CareerUpdated = ({ careers, slug }) => {
  const career = careers[slug];
  return (
    <div className="row row--v-center">
      <p className={css.note}>
        Verified up to date as of patch {career.updated}
      </p>
    </div>
  );
};

function mapStateToProps({ slug, careers }) {
  return {
    slug,
    careers,
  };
}

export default connect(
  mapStateToProps,
  null,
)(CareerUpdated);
