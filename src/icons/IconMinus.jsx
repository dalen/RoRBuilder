import React from 'react';
import classNames from 'classnames';

const IconMinus = props => {
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
      <path d="M0 3v2h8v-2h-8z" />
    </svg>
  );
};

export default IconMinus;
