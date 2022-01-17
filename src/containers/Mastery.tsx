import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Mastery.module.css';

import Ability from './Ability';
import PathMeterContainer from './PathMeterContainer';
import PathInfo from '../components/PathInfo';

import { State, Abilities } from '../reducers';

const renderPathPopover = (abilities: Abilities, pathName: 'a' | 'b' | 'c') => {
  if (abilities.mastery[pathName].popover) {
    return <PathInfo pathPopover={abilities.mastery[pathName].popover} />;
  }
  return null;
};

const renderAbility = (abilities: Abilities, abilityId: number) => {
  return <Ability key={abilityId} data={abilities.indexed[abilityId]} />;
};

const renderCoreAbilities = (abilities: Abilities, path: 'a' | 'b' | 'c') => {
  const { coreAbilities } = abilities.mastery[path];
  // Split core abilities into two columns if there are 6 or more abilities (currently only Squig Herder)
  if (coreAbilities.length > 6) {
    const coreAbilities1 = [...coreAbilities.slice(0, 6)];
    const coreAbilities2 = [...coreAbilities.slice(6)];
    return [
      <div key="core1" className="column">
        {coreAbilities1.map((ability) => renderAbility(abilities, ability))}
      </div>,
      <div key="core2" className="l-col">
        {coreAbilities2.map((ability) => renderAbility(abilities, ability))}
      </div>,
    ];
  }
  return (
    <div className="column">
      {coreAbilities.map((ability) => renderAbility(abilities, ability))}
    </div>
  );
};

const Mastery = (props: ReturnType<typeof mapStateToProps>) => {
  const labelClass = classNames({
    [css.label]: true,
    'marginLeft--small': true,
    [css.labelActive]: props.currentPoints > 0,
  });

  if (props.abilities == null) {
    return null;
  }

  return (
    <div className={css.container}>
      <h2 className={css.heading}>
        Mastery abilities{' '}
        <span className={labelClass}>{props.currentPoints} points</span>
      </h2>
      <div className="grid">
        <div className="grid-col-1-2 grid-col-1@mobile grid-col-1-3@sm-min">
          <div className="borderRight borderRight--none@mobile borderRight@sm-min marginRight borderBottom@mobile paddingBottom@mobile">
            <h3 className={css.subHeading}>
              {props.abilities.mastery.a.name}
              {renderPathPopover(props.abilities, 'a')}
            </h3>
            <div className="row row--justify">
              <div className="row row--justify">
                <PathMeterContainer path="a" />
              </div>
              <div className="marginRight marginRight--large@mobile">
                <div className={css.subHeadingSmall}>
                  Core
                  <br />
                  abilities
                </div>
                <div className="row">
                  {renderCoreAbilities(props.abilities, 'a')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-col-1-2 grid-col-1@mobile grid-col-1-3@sm-min">
          <div className="borderRight@sm-min marginRight marginTop@mobile borderBottom@mobile paddingBottom@mobile">
            <h3 className={css.subHeading}>
              {props.abilities.mastery.b.name}
              {renderPathPopover(props.abilities, 'b')}
            </h3>
            <div className="row row--justify">
              <div className="row row--justify">
                <PathMeterContainer path="b" />
              </div>
              <div className="marginRight marginRight--large@mobile">
                <div className={css.subHeadingSmall}>
                  Core
                  <br />
                  abilities
                </div>
                <div className="row">
                  {renderCoreAbilities(props.abilities, 'b')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-col-1-2 grid-col-1@mobile grid-col-1-3@sm-min">
          <div className="borderRight borderRight--none@mobile borderRight--none@sm-min marginRight marginTop marginTop--none@sm-min">
            <h3 className={css.subHeading}>
              {props.abilities.mastery.c.name}
              {renderPathPopover(props.abilities, 'c')}
            </h3>
            <div className="row row--justify">
              <div className="row row--justify">
                <PathMeterContainer path="c" />
              </div>
              <div className="marginRight marginRight--large@mobile">
                <div className={css.subHeadingSmall}>
                  Core
                  <br />
                  abilities
                </div>
                <div className="row">
                  {renderCoreAbilities(props.abilities, 'c')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ points, currentPoints, abilities }: State) {
  return {
    points,
    currentPoints,
    abilities,
  };
}

export default connect(mapStateToProps)(Mastery);
