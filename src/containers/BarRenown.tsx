import { connect } from 'react-redux';
import css from '../css/components/BarRenown.module.css';
import Bar from '../components/Bar';

import { State } from '../reducers';

const MAX_RENOWN = 80;

function mapStateToProps({ renown }: State) {
  return {
    renown,
  };
}

const BarRenown = ({ renown }: ReturnType<typeof mapStateToProps>) => {
  return (
    <Bar
      level={renown}
      max={MAX_RENOWN}
      classNameBar={css.bar}
      classNameProgress={css.progress}
    />
  );
};

export default connect(mapStateToProps)(BarRenown);
