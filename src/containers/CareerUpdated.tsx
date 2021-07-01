import { connect } from 'react-redux';
import css from '../css/components/CareerUpdated.module.css';

import { State } from '../reducers';

const CareerUpdated = ({
  careers,
  slug,
}: ReturnType<typeof mapStateToProps>) => {
  if (slug == null) return <div> </div>;

  const career = careers[slug];
  return (
    <div className="row row--v-center">
      <p className={css.note}>
        Verified up to date as of patch {career.updated}
      </p>
    </div>
  );
};

function mapStateToProps({ slug, careers }: State) {
  return {
    slug,
    careers,
  };
}

export default connect(mapStateToProps)(CareerUpdated);
