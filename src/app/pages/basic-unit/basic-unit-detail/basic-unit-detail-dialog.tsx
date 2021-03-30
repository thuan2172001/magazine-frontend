import React from 'react';
import {Modal} from 'react-bootstrap';
import BasicUnitDetail from './basic-unit-detail';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useIntl} from 'react-intl';

function BasicUnitDetailDialog({
                                 show,
                                 unitForEdit,
                                 hideModal,
                               }: {
  show: any;
  unitForEdit: any;
  hideModal: any;
}) {
  const initUnit = {
    code: '',
    name: '',
    status: 0,
  };
  
  const intl = useIntl();
  
  return (
    <Modal
      show={show.detail}
      onHide={() => hideModal('detail')}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.TITLE'})}
        </Modal.Title>
      </Modal.Header>
      
      <BasicUnitDetail unitForEdit={unitForEdit || initUnit}/>
      <Modal.Footer>
        <button
          type="button"
          onClick={() => hideModal('detail')}
          className="btn btn-outline-danger">
          <CancelOutlinedIcon style={{fontSize: '1em'}}/>{' '}
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DIALOG.BUTTON.CLOSE'})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default BasicUnitDetailDialog;
