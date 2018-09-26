import React from 'react';
import IconChevronRight from '../icons/IconChevronRight';
import css from '../../css/components/News.css';

const News = () =>
  <div className={css.container}>
    <div className={css.heading}>Latest updates</div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>9/26/2018</div>
      <span className={css.itemText}>Testing ability to update the career pages.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>4/11/2017</div>
      <span className={css.itemText}>Updates careers inline with <a href="https://www.returnofreckoning.com/forum/viewtopic.php?f=42&t=23732" target="blank">latest patch</a>.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>4/11/2017</div>
      <span className={css.itemText}>A couple of UI improvements: Sidebar menu is now ordered in a sane manner, Mastery tree and abilities are now clickable.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>30/10/2017</div>
      <span className={css.itemText}>Major update of skills and abilities of all careers.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>12/6/2016</div>
      <span className={css.itemText}>A number of UI improvements to Mastery area.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>10/6/2016</div>
      <span className={css.itemText}>First major update. Mastery abilities can now be activated independent of selection. Interface reskinned.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>1/6/2016</div>
      <span className={css.itemText}>We are live :)</span>
    </div>
  </div>;

export default News;
