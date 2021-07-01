import classNames from 'classnames';

const IconMinus = ({
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
      <path d="M0 3v2h8v-2h-8z" />
    </svg>
  );
};

export default IconMinus;
