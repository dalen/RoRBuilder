import classNames from 'classnames';

const IconChevronRight = ({
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
      <path d="M2.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" />
    </svg>
  );
};

export default IconChevronRight;
