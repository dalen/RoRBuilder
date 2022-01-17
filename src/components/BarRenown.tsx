import css from '../css/components/BarRenown.module.css';
import Bar from './Bar';

const MAX_RENOWN = 80;

const BarRenown = ({ renown }: { renown: number }) => {
  return (
    <Bar
      level={renown}
      max={MAX_RENOWN}
      classNameBar={css.bar}
      classNameProgress={css.progress}
    />
  );
};

export default BarRenown;
