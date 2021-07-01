import { connect } from 'react-redux';
import ModalShare from '../components/ModalShare';

import { State } from '../reducers';

function mapStateToProps({ slug, careers, sharingLink }: State) {
  return {
    slug,
    careers,
    sharingLink,
  };
}

const ModalShareCareer = ({
  slug,
  careers,
  sharingLink,
}: ReturnType<typeof mapStateToProps>) => {
  if (!slug || !sharingLink) return <div>No career selected</div>;

  const url = `../images/icons/${slug}.png`;

  return (
    <ModalShare
      sharingLink={sharingLink}
      icon={url}
      title={`Share this ${careers[slug].name} build`}
      shareText={`RoR.builders - ${careers[slug].name}`}
    />
  );
};

export default connect(mapStateToProps)(ModalShareCareer);
