const calculateBarWidth = (level: number, max: number) => {
  const barWidth = Math.round((level / max) * 100);
  const barStyle = {
    width: `${barWidth}%`,
  };
  return barStyle;
};

const Bar = ({
  level,
  max,
  classNameBar,
  classNameProgress,
}: {
  level: number;
  max: number;
  classNameBar: string;
  classNameProgress: string;
}) => {
  return (
    <div className={classNameBar}>
      <div
        className={classNameProgress}
        style={calculateBarWidth(level, max)}
      />
    </div>
  );
};

export default Bar;
