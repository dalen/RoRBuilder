import css from '../css/components/PopoverAbility.module.css';

import { Ability } from '../helpers/abilities';

const renderNote = (note: string) => {
  if (note) {
    return (
      <p className={css.note} dangerouslySetInnerHTML={{ __html: note }} />
    );
  }
  return false;
};

const PopoverAbility = ({
  data,
  imgSrc,
}: {
  data: Ability;
  imgSrc: string;
}) => {
  return (
    <div>
      <img alt={data.name} src={imgSrc} className={css.image} />
      <div className={css.rowLarge}>
        <p className={css.itemTitle}>{data.name}</p>
        <p className={css.itemTitleRight}>{data.type}</p>
      </div>
      <div className={css.divider} />
      <div className={css.row}>
        <p className={css.item}>{data.spec}</p>
        <p className={css.itemRight}>
          Level&nbsp;
          {data.minrank}
        </p>
      </div>
      <div className={css.row}>
        <p className={css.item}>{data.cost}</p>
        <p className={css.itemRight}>{data.range}</p>
      </div>
      <div className={css.rowLarge}>
        <p className={css.item}>{data.incant}</p>
        <p className={css.itemRight}>{data.cooldown}</p>
      </div>
      {renderNote(data.note)}
      <p
        className={css.description}
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
};

export default PopoverAbility;
