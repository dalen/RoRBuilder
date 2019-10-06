import React from 'react';
import { connect } from 'react-redux';
import css from '../css/components/ModalShare.module.css';

import Modal from './Modal';
import { State } from '../reducers';

const ModalShare = ({
  slug,
  careers,
  sharingLink,
}: Pick<State, 'slug' | 'careers' | 'sharingLink'>) => {
  if (!slug) return <div>No career selected</div>;

  const url = `/images/icons/${slug}.png`;
  const careerName = careers[slug].name;
  const BBCode = `[url=${sharingLink}]RoR.builders - ${careerName}[/url]`;
  return (
    <Modal>
      <div className="row row--v-center">
        <img alt={careerName} src={url} className={css.modalTitleIcon} />
        <h2 className={css.modalTitle}>Share this {careerName} build</h2>
      </div>
      <div>
        <p className={css.modalCopy}>
          To share this build simply copy the link below:
        </p>
        <div className={css.modalSelectable} contentEditable>
          {sharingLink}
        </div>
        <p className={css.modalCopy}>
          Alternatively, here is some BBCode to copy and paste into a forum
          post:
        </p>
        <div className={css.modalSelectable} contentEditable>
          {BBCode}
        </div>
      </div>
    </Modal>
  );
};

function mapStateToProps({ slug, careers, sharingLink }: State) {
  return {
    slug,
    careers,
    sharingLink,
  };
}

export default connect(mapStateToProps)(ModalShare);
