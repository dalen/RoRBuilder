import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/ModalShare.module.css';

import Modal from './Modal';

class ModalShare extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const url = `/images/icons/${this.props.slug}.png`;
    const careerName = this.props.careers[this.props.slug].name;
    const BBCode = `[url=${
      this.props.sharingLink
    }]RoR.builders - ${careerName}[/url]`;
    return (
      <Modal>
        <div className="row row--v-center">
          <img src={url} className={css.modalTitleIcon} />
          <h2 className={css.modalTitle}>Share this{careerName} build</h2>
        </div>
        <div>
          <p className={css.modalCopy}>
            To share this build simply copy the link below:
          </p>
          <div className={css.modalSelectable} contentEditable>
            {this.props.sharingLink}
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
  }
}

function mapStateToProps({ slug, careers, sharingLink }) {
  return {
    slug,
    careers,
    sharingLink,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ModalShare);
