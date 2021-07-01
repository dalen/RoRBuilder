import { connect } from 'react-redux';
import css from '../css/components/CoreAbilities.module.css';

import AbilityTactic from './AbilityTactic';

import { State, Abilities } from '../reducers';

const renderTactic = (abilities: Abilities, abilityId: number) => {
  return <AbilityTactic key={abilityId} data={abilities.indexed[abilityId]} />;
};
const renderTactics = (abilities: Abilities, masteryTactics: number[]) => {
  // Combine core and mastery tactics
  let combinedTactics = [];
  if (masteryTactics.length > 0) {
    combinedTactics = [...abilities.structured.coreTactics, ...masteryTactics];
  } else {
    combinedTactics = abilities.structured.coreTactics;
  }
  return combinedTactics.map((tactic) => renderTactic(abilities, tactic));
};

const CoreTactics = ({
  abilities,
  masteryTactics,
}: ReturnType<typeof mapStateToProps>) => {
  if (abilities == null) {
    return null;
  }
  return (
    <div className={css.container}>
      <h2 className={css.heading}>Tactics</h2>
      <div className="row">{renderTactics(abilities, masteryTactics)}</div>
    </div>
  );
};

function mapStateToProps({ abilities, masteryTactics }: State) {
  return {
    abilities,
    masteryTactics,
  };
}

export default connect(mapStateToProps)(CoreTactics);
