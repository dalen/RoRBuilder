import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import css from '../css/components/SidebarItem.module.css';

import * as actionOverlay from '../actions/actionOverlay';
import * as actionSidebar from '../actions/actionSidebar';

import { State } from '../reducers';

function mapStateToProps({ sidebar, overlay }: State) {
  return {
    sidebar,
    overlay,
  };
}

const mapDispatchToProps = {
  toggleOverlay: actionOverlay.toggleOverlay,
  toggleSidebar: actionSidebar.toggleSidebar,
};

type Props = {
  url: string;
  img: string;
  text: string;
  onClick: () => void;
} & ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const SidebarItem = ({
  url,
  img,
  text,
  toggleSidebar,
  toggleOverlay,
  onClick,
}: Props) => {
  const clickItem = () => {
    if (onClick !== undefined) onClick();

    // Hide sidebar and overlay
    toggleSidebar(false);
    toggleOverlay(false);
  };

  return (
    <div className={css.item}>
      <Link to={url} onClick={clickItem}>
        <img alt={text} src={img} className={css.icon} />
      </Link>
      <Link className={css.link} to={url} onClick={clickItem}>
        {text}
      </Link>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);
