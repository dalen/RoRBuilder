import React from 'react';
import classNames from 'classnames';

const IconChevronRight = props => {
  const iconClass = classNames({
    icon: true,
    [props.classes]: props.classes,
  });
  return (
    <svg
      className={iconClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      aria-labelledby={props.name}
    >
      <title id={props.nameSlug}>{props.name}</title>
      <path d="M2.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" />
    </svg>
  );
};

export default IconChevronRight;
