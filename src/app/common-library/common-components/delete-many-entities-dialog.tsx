import React, {useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {useIntl} from 'react-intl';
import {DeleteManyDialogProps} from '../common-types/common-type';
import {CapitalizeFirstLetter} from '../helpers/common-function';
import {iconStyle} from "../common-consts/const";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import _ from "lodash";

function DeleteManyEntitiesDialog<T>({
                                       selectedEntities,
                                       isShow,
                                       onHide,
                                       onDelete,
                                       title = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.TITLE',
                                       bodyTitle = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.BODY_TITLE',
                                       confirmMessage = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.CONFIRM',
                                       noSelectedEntityMessage = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.NO_SELECTED_ENTITY',
                                       deletingMessage = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.DELETING',
                                       deleteBtn = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.DELETE_BTN',
                                       cancelBtn = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.CANCEL_BTN',
                                       moduleName = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.MODULE_NAME',
                                       loading,
                                       error = {error: ''},
                                     }: DeleteManyDialogProps<T>) {
  const intl = useIntl();
  const _innerError = useMemo((): string | ({ message: string, additional: string }[]) => {
    try {
      return JSON.parse(error.error)
    } catch (e) {
      return error?.error
    }
  }, [error]);
  return (<>
    <Modal
      show={isShow && (error.error === '')}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-delete-many">
      {/*begin::Loading*/}
      {/*end::Loading*/}
      <Modal.Header className="border-bottom-0" closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})})
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedEntities && selectedEntities.length > 0 ? (
          !loading && (
            <>
              {CapitalizeFirstLetter(
                intl.formatMessage(
                  {id: bodyTitle},
                  {moduleName: intl.formatMessage({id: moduleName})},
                ),
              )}
              {' ' + intl.formatMessage(
                {id: confirmMessage},
                {moduleName: intl.formatMessage({id: moduleName})},
              )}
            </>
          )
        ) : (
          <>
            {intl.formatMessage(
              {id: noSelectedEntityMessage},
              {moduleName: intl.formatMessage({id: moduleName})},
            )}
          </>
        )}
        {loading && <span className={'ml-1'}>{intl.formatMessage({id: deletingMessage})}</span>}
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        {selectedEntities && selectedEntities.length > 0 &&
        <button type="button" className="btn btn-primary mr-lg-8 fixed-btn-width"
                onClick={e => onDelete(selectedEntities)}>
          {/*<DeleteIcon style={iconStyle}/>*/}
          {loading ? (<div className="spinner spinner-sm spinner-darker-white">
            <span className={'ml-6'}>{intl.formatMessage({id: deleteBtn})}</span>
          </div>) : intl.formatMessage({id: deleteBtn})}
        </button>}
        
        <button type="button" onClick={onHide} className="btn btn-outline-primary fixed-btn-width">
          <CancelOutlinedIcon style={iconStyle}/>
          {intl.formatMessage({id: cancelBtn})}
        </button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={isShow && (error.error !== '')}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-delete-many">
      {/*begin::Loading*/}
      {/*end::Loading*/}
      <Modal.Header className="border-bottom-0" closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})})
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!loading && error.error !== '' && (
          <>
            {_.isString(_innerError) ?
              (<p className='text-danger'>{intl.formatMessage({id: _innerError})}</p>)
              : _innerError.map((e, index) => (
                (<p key={`abc${index}`} className='text-danger'>{intl.formatMessage({id: e.message}, e)}</p>)
              ))
            }
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <button type="button" onClick={onHide} className="btn btn-outline-primary fixed-btn-width">
          <CancelOutlinedIcon style={iconStyle}/>
          {intl.formatMessage({id: cancelBtn})}
        </button>
      </Modal.Footer>
    </Modal>
  </>);
}

export default DeleteManyEntitiesDialog;
