import { connect } from 'react-redux';
import css from '../css/components/CareerTitle.module.css';

import { State } from '../reducers';

const CareerTitle = ({ careers, slug }: ReturnType<typeof mapStateToProps>) => {
  if (slug == null)
    return <div className="row row--v-center">No career selected</div>;

  const career = careers[slug];
  const url = `../images/icons/${career.slug}.png`;
  return (
    <div className="row row--v-center">
      <img alt={`Career icon ${career.name}`} src={url} className={css.icon} />
      <h1 className={css.title}>{career.name}</h1>
    </div>
  );
};

function mapStateToProps({ slug, careers }: State) {
  return {
    slug,
    careers,
  };
}

export default connect(mapStateToProps)(CareerTitle);
