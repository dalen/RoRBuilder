import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Sidebar.module.css';
import CareerItem from './CareerItem';
import { State } from '../reducers';

const renderCareers = (careers: { [key: string]: any }) => {
  return Object.keys(careers).map(key => (
    <div className={css.item} key={key}>
      <CareerItem career={careers[key]} />
    </div>
  ));
};

const Sidebar = ({ sidebar, careers }: { sidebar: boolean; careers: any }) => {
  const sidebarClass = classNames({
    [css.container]: !sidebar,
    [css.containerActive]: sidebar,
  });

  return (
    <div className={sidebarClass}>
      <div className={css.content}>{renderCareers(careers)}</div>
    </div>
  );
};

function mapStateToProps({ careers, sidebar }: State) {
  return {
    careers,
    sidebar,
  };
}

export default connect(mapStateToProps)(Sidebar);
