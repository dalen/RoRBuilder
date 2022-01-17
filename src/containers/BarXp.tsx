import { connect } from 'react-redux';
import css from '../css/components/BarXp.module.css';
import Bar from '../components/Bar';

import { State } from '../reducers';

const MAX_LEVEL = 40;

function mapStateToProps({ level }: State) {
  return {
    level,
  };
}

const BarXp = ({ level }: ReturnType<typeof mapStateToProps>) => {
  return (
    <Bar
      level={level}
      max={MAX_LEVEL}
      classNameBar={css.bar}
      classNameProgress={css.progress}
    />
  );
};

export default connect(mapStateToProps)(BarXp);
