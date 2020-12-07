import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Loading.module.css';

import { State } from '../reducers';

function mapStateToProps({ sidebar }: State) {
  return {
    sidebar,
  };
}

const Loading = ({ sidebar }: ReturnType<typeof mapStateToProps>) => {
  const containerClass = classNames({
    [css.container]: !sidebar,
    [css.containerSidebar]: sidebar,
  });

  return (
    <div className={containerClass}>
      <div className={css.icon} />
      <span className={css.title}>Loading...</span>
    </div>
  );
};

export default connect(mapStateToProps)(Loading);
