import React, {useEffect, useMemo, useState} from 'react';
import {Modal, Spinner} from 'react-bootstrap';
import {Form, Formik} from 'formik';
import {useIntl} from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {ModifyPanel} from '../common-types/common-type';
import {iconStyle} from '../common-consts/const';
import {ModifyEntityPage} from './modify-entity-page';
import {InitValues} from "../helpers/common-function";

function ModifyEntityDialogForm<T>({
                                     entity,
                                     onModify,
                                     moduleName = 'COMMON_COMPONENT.CREATE_UPDATE.MODULE_NAME',
                                     onHide,
                                     modifyPanel,
                                     validation,
                                     loading
                                   }: {
  moduleName?: string;
  entity?: any;
  onHide: () => void;
  onModify: (values: any) => Promise<any>;
  modifyPanel: ModifyPanel;
  validation: any;
  loading?: boolean
}) {
  const intl = useIntl();
  const {_title, ...inputGroups} = modifyPanel;
  const initValues = useMemo(() => InitValues({_header: '', panel1: modifyPanel}), [modifyPanel]);
  const [entityForEdit, setEntityForEdit] = useState(initValues);
  
  useEffect(() => {
     setEntityForEdit(entity ?? initValues);
  }, [entity,initValues]);
  
  return (
    <Formik
      enableReinitialize={true}
      initialValues={entityForEdit}
      validationSchema={validation}
      onSubmit={(values, {setSubmitting}) => {
        // console.log(values);
        onModify({...entity, ...values, __v: undefined}).then(() => {
          onHide()
        }).catch((err) => {
          setSubmitting(false)
        });
      }}>
      {({handleSubmit}) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            <Form className="form form-label-right">
              {Object.keys(inputGroups).map(key => (
                <React.Fragment key={key}>
                  <ModifyEntityPage inputGroups={inputGroups}/>
                </React.Fragment>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-10">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="btn btn-primary fixed-btn-width">
              {
                loading === true ? <Spinner animation="border" variant="light" size="sm"/> :
                  <SaveOutlinedIcon style={iconStyle}/>
              }
              {'\u00A0'}
              {intl.formatMessage({id: 'COMMON_COMPONENT.MODIFY_DIALOG.SAVE_BTN'})}
            </button>
            <button
              type="button"
              onClick={onHide}
              className="btn btn-outline-primary fixed-btn-width">
              <CancelOutlinedIcon style={iconStyle}/>
              {intl.formatMessage({id: 'COMMON_COMPONENT.MODIFY_DIALOG.CLOSE_BTN'})}
            </button>
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
}

export default ModifyEntityDialogForm;
