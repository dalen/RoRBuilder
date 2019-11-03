import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/components/BarRenown.module.css';

import { State } from '../reducers';

type Props = ReturnType<typeof mapStateToProps>;

class BarRenown extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.calculateBarWidth = this.calculateBarWidth.bind(this);
  }

  calculateBarWidth() {
    let barWidth = 5;
    if (Number(this.props.level) > 10) {
      switch (Number(this.props.renown)) {
        case 10:
          barWidth = 5;
          break;
        case 40:
          barWidth = 25;
          break;
        case 50:
          barWidth = 50;
          break;
        case 60:
          barWidth = 75;
          break;
        case 70:
          barWidth = 100;
          break;
        default:
          barWidth = 5;
          break;
      }
    }
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

function mapStateToProps({ level, renown }: State) {
  return {
    level,
    renown,
  };
}

export default connect(mapStateToProps)(BarRenown);
