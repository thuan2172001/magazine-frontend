import React from 'react';
import {Modal} from 'react-bootstrap';
import {AnyAction} from 'redux';
import {useIntl} from 'react-intl';

const fontSizes = {
  fontSize: '1.1em',
};

function BasicUnitDetail({unitForEdit}: { unitForEdit: AnyAction }) {
  const intl = useIntl();
  
  return (
    <>
      <Modal.Body>
        <div className="row">
          <div className="col-7" style={fontSizes}>
            {intl.formatMessage({id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.CODE'})}:
          </div>
          <div className="col-5">{unitForEdit.code}</div>
        </div>
        <div className="row mt-5">
          <div className="col-7" style={fontSizes}>
            {intl.formatMessage({id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.NAME'})}:
          </div>
          <div className="col-5">{unitForEdit.name}</div>
        </div>
        <div className="row mt-5">
          <div className="col-7" style={fontSizes}>
            {intl.formatMessage({id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.STATUS'})}:
          </div>
          <div className="col-5">{unitForEdit.status == 1 ? 'Hoạt động' : 'Không hoạt động'}</div>
        </div>
      </Modal.Body>
    </>
  );
}

export default BasicUnitDetail;
