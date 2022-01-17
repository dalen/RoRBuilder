import IconChevronRight from '../icons/IconChevronRight';
import css from '../css/components/News.module.css';

const News = () => {
  return (
    <div className={css.container}>
      <div className={css.heading}>Latest updates</div>
      <div className={css.item}>
        <span className={css.itemIcon}>
          <IconChevronRight
            classes="icon--small"
            name="right chevron icon"
            nameSlug="right-chevron-icon"
          />
        </span>
        <div className={css.itemDate}>2019-11-15</div>
        <span className={css.itemText}>A Renown Builder has been added!</span>
      </div>
      <div className={css.item}>
        <span className={css.itemIcon}>
          <IconChevronRight
            classes="icon--small"
            name="right chevron icon"
            nameSlug="right-chevron-icon"
          />
        </span>
        <div className={css.itemDate}>2019-03-05</div>
        <span className={css.itemText}>
          Abilites are now sorted by minimum level required.
        </span>
      </div>
      <div className={css.item}>
        <span className={css.itemIcon}>
          <IconChevronRight
            classes="icon--small"
            name="right chevron icon"
            nameSlug="right-chevron-icon"
          />
        </span>
        <div className={css.itemDate}>2019-01-14</div>
        <span className={css.itemText}>
          Now each career page displays the last patch date that career page was
          updated for.
        </span>
      </div>
    </div>
  );
};

export default News;
