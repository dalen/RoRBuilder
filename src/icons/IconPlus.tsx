import classNames from 'classnames';

const IconPlus = ({
  name,
  nameSlug,
  classes,
}: {
  name: string;
  nameSlug: string;
  classes: string;
}) => {
  const iconClass = classNames({
    icon: true,
    [classes]: classes,
  });
  return (
    <svg
      className={iconClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      aria-labelledby={name}
    >
      <title id={nameSlug}>{name}</title>
      <path d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
    </svg>
  );
};

export default IconPlus;
