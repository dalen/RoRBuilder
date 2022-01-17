import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Sidebar.module.css';
import CareerItem from './CareerItem';
import { State } from '../reducers';
import { CareerSummary } from '../reducers/reducerCareers';
import SidebarItem from './SideBarItem';
import careerData from '../data/careers.json';

const renderCareers = (careers: { [key: string]: CareerSummary }) => {
  return Object.keys(careers).map((key) => (
    <div className={css.item} key={key}>
      <CareerItem career={careers[key]} />
    </div>
  ));
};

function mapStateToProps({ sidebar }: State) {
  return {
    sidebar,
  };
}

const Sidebar = ({ sidebar }: ReturnType<typeof mapStateToProps>) => {
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
            onClick={() => undefined}
          />
        </div>
        {renderCareers(careerData)}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Sidebar);
