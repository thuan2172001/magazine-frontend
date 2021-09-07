import React from 'react';
import {Modal} from 'react-bootstrap';
import BasicUnitDialogHeader from './basic-unit-dialog-header';
import BasicUnitForm from './basic-unit-form';

function BasicUnitDialog({
                           show,
                           hideModal,
                           unitForEdit,
                           editBasicUnit,
                           addBasicUnit,
                           error,
                         }: any) {
  const {edit}: { edit: boolean } = show;
  const initForm = {
    code: '',
    name: '',
    status: 1,
  };
  
  const handleActionBasicUnit = (values: any) => {
    if (unitForEdit) {
      editBasicUnit(values);
      return;
    } else {
      addBasicUnit(values);
    }
  };
  
  return (
    <Modal
      show={edit}
      onHide={() => hideModal('edit')}
      aria-labelledby="example-modal-sizes-title-lg">
      <BasicUnitDialogHeader unitForEdit={unitForEdit}/>
      <BasicUnitForm
        unitForEdit={unitForEdit || initForm}
        onHide={hideModal}
        handleActionBasicUnit={handleActionBasicUnit}
        error={error}
      />
    </Modal>
  );
}

export default BasicUnitDialog;
