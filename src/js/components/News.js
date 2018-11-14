import React from 'react';
import IconChevronRight from '../icons/IconChevronRight';
import css from '../../css/components/News.css';

const News = () =>
  <div className={css.container}>
    <div className={css.heading}>Latest updates</div>
	<div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>13/11/2018</div>
      <span className={css.itemText}>Updated all but WL (but there may be other errors ofc on the site). If anyone want to help with keeping this site up to date please contact Natherul.</span>
    </div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>27/10/2018</div>
      <span className={css.itemText}>All classes but Chosen and WL updated. Code handed off to RoR server devs</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>26/9/2018</div>
      <span className={css.itemText}>Created new app off of old one.</span>
    </div>
    <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>6/1/2016</div>
      <span className={css.itemText}>We are live :)</span>
    </div>
  </div>;

export default News;
