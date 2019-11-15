import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Sidebar.module.css';
import CareerItem from './CareerItem';
import { State } from '../reducers';
import { CareerSummary } from '../reducers/reducerCareers';
import SidebarItem from './SideBarItem';

const renderCareers = (careers: { [key: string]: CareerSummary }) => {
  return Object.keys(careers).map(key => (
    <div className={css.item} key={key}>
      <CareerItem career={careers[key]} />
    </div>
  ));
};

function mapStateToProps({ careers, sidebar }: State) {
  return {
    careers,
    sidebar,
  };
}

const Sidebar = ({ sidebar, careers }: ReturnType<typeof mapStateToProps>) => {
  const sidebarClass = classNames({
    [css.container]: !sidebar,
    [css.containerActive]: sidebar,
  });

  return (
    <div className={sidebarClass}>
      <div className={css.content}>
        <div className={css.item}>
          <SidebarItem
            url="/renown"
            text="Renown Builder"
            img="/images/renown/specpoint_renown.png"
          />
        </div>
        {renderCareers(careers)}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Sidebar);
