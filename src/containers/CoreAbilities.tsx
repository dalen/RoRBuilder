import { connect } from 'react-redux';
import css from '../css/components/CoreAbilities.module.css';

import Ability from './Ability';

import { State, Abilities } from '../reducers';

const renderAbility = (abilities: Abilities, abilityId: number) => {
  return <Ability key={abilityId} data={abilities.indexed[abilityId]} />;
};

const CoreAbilities = ({ abilities }: ReturnType<typeof mapStateToProps>) => {
  if (abilities == null) {
    return null;
  }
  return (
    <div className={css.container}>
      <h2 className={css.heading}>Core abilities</h2>
      <div className="row">
        {abilities.structured.coreAbilities.map((ability) =>
          renderAbility(abilities, ability),
        )}
      </div>
    </div>
  );
};

function mapStateToProps({ abilities }: State) {
  return {
    abilities,
  };
}

export default connect(mapStateToProps)(CoreAbilities);
