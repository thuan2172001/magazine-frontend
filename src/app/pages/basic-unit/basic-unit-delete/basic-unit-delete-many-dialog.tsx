import React from 'react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import {Modal} from 'react-bootstrap';
import {ModalProgressBar} from '../../../common-library/modal-progress-bar';
import {useIntl} from 'react-intl';
import {DeleteMany} from '../_interface/basic-unit.interface';

function BasicUnitDeleteManyDialog({
                                     ids,
                                     show,
                                     hideModal,
                                     unitForEdit,
                                     loading,
                                     deleteManyBasicUnit,
                                   }: DeleteMany) {
  const intl = useIntl();
  
  return (
    <Modal
      show={show.deleteMany}
      onHide={() => hideModal('deleteMany')}
      aria-labelledby="example-modal-sizes-title-lg">
      {/*begin::Loading*/}
      {loading && <ModalProgressBar/>}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DELETE_DIALOG.TITLE'})}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ids && ids.length > 0 ? (
          !loading && (
            <div>
              <p>{intl.formatMessage({id: 'BASIC_UNIT.CARD.DELETE_DIALOG.CONTENT_NOTICE'})}</p>
              
              <p className="mt-3">
                {intl.formatMessage({id: 'BASIC_UNIT.CARD.DELETE_DIALOG.CONFIRM'})}
              </p>
            </div>
          )
        ) : (
          <div>
            <p>{intl.formatMessage({id: 'BASIC_UNIT.CARD.HEADER.NO_CHOOSEN'})}</p>
          </div>
        )}
        {loading && <span>{intl.formatMessage({id: 'BASIC_UNIT.CARD.HEADER.DELETING'})}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          {ids && ids.length > 0 && (
            <button type="button" onClick={deleteManyBasicUnit} className="btn btn-danger mr-3">
              <DeleteIcon/> {intl.formatMessage({id: 'BASIC_UNIT.CARD.HEADER.BUTTON.DELETE'})}
            </button>
          )}
          <button
            type="button"
            onClick={() => hideModal('deleteMany')}
            className="btn btn-outline-danger">
            <CancelOutlinedIcon/>{' '}
            {intl.formatMessage({id: 'BASIC_UNIT.CARD.DIALOG.BUTTON.CANCEL'})}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default BasicUnitDeleteManyDialog;
