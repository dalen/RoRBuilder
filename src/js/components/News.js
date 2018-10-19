import React from 'react';
import IconChevronRight from '../icons/IconChevronRight';
import css from '../../css/components/News.css';

const News = () =>
  <div className={css.container}>
    <div className={css.heading}>Latest updates</div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>10/19/2018</div>
      <span className={css.itemText}>Fixed SH, Updated BO, Updated Magus, Updated WL to proposed changes. Ate a chaos bagel, it was delicious.</span>
    </div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>10/08/2018</div>
      <span className={css.itemText}>Updated SW. Changed the home page to reference new nomenclature for buffs/debuffs.</span>
    </div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>10/08/2018</div>
      <span className={css.itemText}>Updated WH, and Engi. A few attempts at addressing moblie user issues.</span>
    </div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>10/04/2018</div>
      <span className={css.itemText}>Updated KotBS, SH, SM, and WP</span>
    </div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>10/01/2018</div>
      <span className={css.itemText}>All careers now start at r40/rr40+.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>9/27/2018</div>
      <span className={css.itemText}>Updated AM, BG, BW, DoK, IB, RP, SL, and WE careers.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>9/26/2018</div>
      <span className={css.itemText}>Created new app off of old one.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>1/6/2016</div>
      <span className={css.itemText}>We are live :)</span>
    </div>
  </div>;

export default News;
