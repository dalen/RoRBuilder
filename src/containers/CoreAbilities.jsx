import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/components/CoreAbilities.module.css';

import Ability from './Ability';

class CoreAbilities extends Component {
  constructor(props) {
    super(props);
    this.renderAbility = this.renderAbility.bind(this);
  }

  renderAbility(abilityId) {
    return (
      <Ability key={abilityId} data={this.props.abilities.indexed[abilityId]} />
    );
  }

  render() {
    if (this.props.abilities.length === 0) {
      return null;
    }
    return (
      <div className={css.container}>
        <h2 className={css.heading}>Core abilities</h2>
        <div className="row">
          {this.props.abilities.structured.coreAbilities.map(
            this.renderAbility,
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ abilities }) {
  return {
    abilities,
  };
}

export default connect(
  mapStateToProps,
  null,
)(CoreAbilities);
