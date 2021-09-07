import React from 'react';
import {Modal} from 'react-bootstrap';
import {useIntl} from 'react-intl';

function BasicUnitDialogHeader({unitForEdit}: { unitForEdit: any }) {
  const intl = useIntl();
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title" className="text-danger">
          {unitForEdit ? (
            <span>{intl.formatMessage({id: 'BASIC_UNIT.CARD.EDIT_DIALOG.TITLE'})}</span>
          ) : (
            <span>Thêm mới</span>
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}

export default BasicUnitDialogHeader;
