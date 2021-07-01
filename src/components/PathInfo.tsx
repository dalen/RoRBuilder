import { useState } from 'react';
import classNames from 'classnames';
import Popover from './Popover';
import css from '../css/components/PathInfo.module.css';

type PathPopover = {
  primary: string;
  secondary?: string;
};

const renderPopoverPrimary = (pathPopover: PathPopover) => {
  if (pathPopover.primary) {
    return <div className={css.popoverPrimary}>{pathPopover.primary}</div>;
  }
  return null;
};

const renderPopoverSecondary = (pathPopover: PathPopover) => {
  if (pathPopover.secondary) {
    return <div className={css.popoverSecondary}>{pathPopover.secondary}</div>;
  }
  return null;
};

const renderPopoverContent = (pathPopover: PathPopover) => {
  return (
    <div>
      {renderPopoverPrimary(pathPopover)}
      {renderPopoverSecondary(pathPopover)}
    </div>
  );
};

const PathInfo = ({ pathPopover }: { pathPopover: PathPopover }) => {
  const [hovered, setHovered] = useState(false);

  const hoverOver = () => {
    setHovered(true);
  };

  const hoverOut = () => {
    setHovered(false);
  };

  const infoClass = classNames({
    'is-hovered': hovered,
    popover__parent: true,
  });
  return (
    <div className={infoClass}>
      <div
        className={css.container}
        onFocus={hoverOver}
        onBlur={hoverOut}
        onMouseOver={hoverOver}
        onMouseOut={hoverOut}
      >
        <div className={css.icon}>?</div>
      </div>
      <Popover alignment="top" activate={hovered}>
        {renderPopoverContent(pathPopover)}
      </Popover>
    </div>
  );
};

export default PathInfo;
