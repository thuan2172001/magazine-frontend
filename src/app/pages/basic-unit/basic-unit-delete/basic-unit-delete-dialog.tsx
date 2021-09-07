import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import {useIntl} from 'react-intl';
import {iconStyle} from "../../../common-library/common-consts/const";

function BasicUnitDeleteDialog({
                                 show,
                                 unitForEdit,
                                 hideModal,
                                 deleteBasicUnit,
                               }: {
  show: any;
  unitForEdit: any;
  hideModal: any;
  deleteBasicUnit: any;
}) {
  const intl = useIntl();
  
  return (
    <Modal
      show={show.delete}
      onHide={() => hideModal('delete')}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DELETE_DIALOG.TITLE'})}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{intl.formatMessage({id: 'BASIC_UNIT.CARD.DELETE_DIALOG.CONTENT_NOTICE'})}</p>
        <p className="mt-5">
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DELETE_DIALOG.CONFIRM'})}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-danger"
          onClick={e => deleteBasicUnit(unitForEdit.code)}>
          <DeleteIcon style={iconStyle}/>
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DIALOG.BUTTON.DELETE'})}
        </button>
        <button
          type="button"
          onClick={() => hideModal('delete')}
          className="btn btn-outline-danger">
          <CancelOutlinedIcon style={iconStyle}/>
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DIALOG.BUTTON.CANCEL'})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default BasicUnitDeleteDialog;
