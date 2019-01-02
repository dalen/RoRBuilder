import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../css/components/BarXp.css';

class BarXp extends Component {
  constructor(props) {
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

function mapStateToProps({ level }) {
  return {
    level,
  };
}

export default connect(
  mapStateToProps,
  null,
)(BarXp);
