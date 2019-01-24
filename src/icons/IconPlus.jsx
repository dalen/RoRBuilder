import React from 'react';
import classNames from 'classnames';

const IconPlus = props => {
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
      <path d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
    </svg>
  );
};

export default IconPlus;
