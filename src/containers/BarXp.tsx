import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/components/BarXp.module.css';

import { State } from '../reducers';

type Props = ReturnType<typeof mapStateToProps>;

class BarXp extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.calculateBarWidth = this.calculateBarWidth.bind(this);
  }

  calculateBarWidth() {
    const maxLevel = 40;
    const barWidth = Math.round((Number(this.props.level) / maxLevel) * 100);
    const barStyle = {
      width: `${barWidth}%`,
    };
    return barStyle;
  }

  render() {
    return (
      <div className={css.bar}>
        <div className={css.progress} style={this.calculateBarWidth()} />
      </div>
    );
  }
}

function mapStateToProps({ level }: State) {
  return {
    level,
  };
}

export default connect(mapStateToProps)(BarXp);
