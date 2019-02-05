import React from 'react';
import css from '../css/components/PopoverAbility.module.css';

const renderNote = note => {
  if (note) {
    return (
      <p className={css.note} dangerouslySetInnerHTML={{ __html: note }} />
    );
  }
  return false;
};

const PopoverAbility = props => (
  <div>
    <img alt={props.data.name} src={props.imgSrc} className={css.image} />
    <div className={css.rowLarge}>
      <p className={css.itemTitle}>{props.data.name}</p>
      <p className={css.itemTitleRight}>{props.data.type}</p>
    </div>
    <div className={css.divider} />
    <div className={css.row}>
      <p className={css.item}>{props.data.spec}</p>
      <p className={css.itemRight}>
        Level
        {props.data.minrank}
      </p>
    </div>
    <div className={css.row}>
      <p className={css.item}>{props.data.cost}</p>
      <p className={css.itemRight}>{props.data.range}</p>
    </div>
    <div className={css.rowLarge}>
      <p className={css.item}>{props.data.incant}</p>
      <p className={css.itemRight}>{props.data.cooldown}</p>
    </div>
    {renderNote(props.data.note)}
    <p
      className={css.description}
      dangerouslySetInnerHTML={{ __html: props.data.description }}
    />
  </div>
);

export default PopoverAbility;
