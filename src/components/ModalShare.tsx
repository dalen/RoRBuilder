import css from '../css/components/ModalShare.module.css';

import Modal from '../containers/Modal';

const ModalShare = ({
  sharingLink,
  icon,
  title,
  shareText,
}: {
  sharingLink: string;
  icon: string;
  title: string;
  shareText: string;
}) => {
  const BBCode = `[url=${sharingLink}]${shareText}[/url]`;
  return (
    <Modal>
      <div className="row row--v-center">
        <img alt={title} src={icon} className={css.modalTitleIcon} />
        <h2 className={css.modalTitle}>{title}</h2>
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

export default ModalShare;
