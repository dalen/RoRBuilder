import { connect } from 'react-redux';
import css from '../css/components/CoreMorales.module.css';

import AbilityMorale from './AbilityMorale';

import { State, Abilities } from '../reducers';

const renderMorale = (abilities: Abilities, abilityId: number) => {
  return (
    <AbilityMorale
      key={abilityId}
      rank="4"
      data={abilities.indexed[abilityId]}
    />
  );
};

const renderMorale4 = (abilities: Abilities, masteryMorales: number[]) => {
  // Combine core and mastery tactics
  let combinedMorales = [];
  if (masteryMorales.length > 0) {
    combinedMorales = [...abilities.structured.coreMorales4, ...masteryMorales];
  } else {
    combinedMorales = abilities.structured.coreMorales4;
  }
  return combinedMorales.map((morale) => renderMorale(abilities, morale));
};

const renderMorales = (abilities: Abilities, masteryMorales: number[]) => {
  return (
    <div className={css.moraleContainer}>
      <div className={css.moraleFirst}>
        <h3 className={css.moraleHeading}>Rank 1</h3>
        <div className="row">
          {abilities.structured.coreMorales1.map((key) => (
            <AbilityMorale key={key} rank="1" data={abilities.indexed[key]} />
          ))}
        </div>
      </div>
      <div className={css.morale}>
        <h3 className={css.moraleHeading}>Rank 2</h3>
        <div className="row">
          {abilities.structured.coreMorales2.map((key) => (
            <AbilityMorale key={key} rank="2" data={abilities.indexed[key]} />
          ))}
        </div>
      </div>
      <div className={css.morale}>
        <h3 className={css.moraleHeading}>Rank 3</h3>
        <div className="row">
          {abilities.structured.coreMorales3.map((key) => (
            <AbilityMorale key={key} rank="3" data={abilities.indexed[key]} />
          ))}
        </div>
      </div>
      <div className={css.moraleLast}>
        <h3 className={css.moraleHeading}>Rank 4</h3>
        <div className="row">{renderMorale4(abilities, masteryMorales)}</div>
      </div>
    </div>
  );
};

const CoreMorales = ({
  abilities,
  masteryMorales,
}: ReturnType<typeof mapStateToProps>) => {
  if (abilities == null) {
    return null;
  }
  return (
    <div className={css.container}>
      <h2 className={css.heading}>Morales</h2>
      {renderMorales(abilities, masteryMorales)}
    </div>
  );
};

function mapStateToProps({ abilities, masteryMorales }: State) {
  return {
    abilities,
    masteryMorales,
  };
}

export default connect(mapStateToProps)(CoreMorales);
