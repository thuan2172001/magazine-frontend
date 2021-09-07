import React from 'react';
import { Modal } from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { useIntl } from 'react-intl';
import { NotifyDialogProps } from '../common-types/common-type';
import { iconStyle } from '../common-consts/const';
import { ModalProgressBar } from '../modal-progress-bar';
import { CapitalizeFirstLetter } from '../helpers/common-function';

export function NotifyDialog<T>({
  isShow,
  onHide,
  title = 'COMMON_COMPONENT.DELETE_DIALOG.TITLE',
  notifyMessage,
  cancelBtn = 'COMMON_COMPONENT.DETAIL_DIALOG.CLOSE_BTN',
  moduleName = 'AGENCY.MODULE_NAME',
}: NotifyDialogProps) {
  const intl = useIntl();

  return (
    <Modal
      show={isShow}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">

      <Modal.Header closeButton className='border-bottom-0'>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({ id: title }, { moduleName: intl.formatMessage({ id: moduleName }) })
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <>
          <p>
            {CapitalizeFirstLetter(
              intl.formatMessage(
                { id: notifyMessage },
                { moduleName: intl.formatMessage({id: moduleName })}
              ),
            )}
          </p>
        </>
      </Modal.Body>

      <Modal.Footer className='border-top-0'>
        <button type="button" onClick={onHide} className="btn btn-outline-primary">
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          <CancelOutlinedIcon style={iconStyle} />
          {'\u00A0'}
          {intl.formatMessage({ id: cancelBtn })}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
