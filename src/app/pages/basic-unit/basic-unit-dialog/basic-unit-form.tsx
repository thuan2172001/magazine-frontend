import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {Field, Form, Formik} from 'formik';
import {Switch} from '@material-ui/core';
import {useIntl} from 'react-intl';
import {MainInput} from '../../../common-library/forms/main-input';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import {iconStyle} from "../../../common-library/common-consts/const";

const BasicUnitSchema = Yup.object().shape({
  code: Yup.string().required('Vui lòng nhập mã đơn vị'),
  name: Yup.string().required('Vui lòng nhập tên đơn vị'),
});

function BasicUnitForm({
                         unitForEdit,
                         onHide,
                         handleActionBasicUnit,
                         error,
                       }: {
  unitForEdit: any;
  onHide: any;
  handleActionBasicUnit: any;
  error: string;
}) {
  const [state, setState] = React.useState({
    status: unitForEdit.status == 1,
  });
  const intl = useIntl();
  
  useEffect(() => {
    setState({status: unitForEdit.status == 1});
  }, [unitForEdit.status]);
  
  const handleChange = (event: any) => {
    console.log(state.status);
    setState({...state, [event.target.name]: event.target.checked});
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={unitForEdit}
        validationSchema={BasicUnitSchema}
        onSubmit={values => {
          const valueEdit = {
            ...values,
            status: state.status ? 1 : 0,
            quantity: 10,
          };
          console.log(valueEdit);
          handleActionBasicUnit(valueEdit);
        }}>
        {({handleSubmit}) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {/* {actionsLoading && (
                        <div className="overlay-layer bg-transparent">
                            <div className="spinner spinner-lg spinner-success"/>
                        </div>
                    )} */}
              <Form className="form form-label-right">
                <div className="mt-3">
                  <Field
                    name="code"
                    component={MainInput}
                    placeholder={intl.formatMessage({id: 'BASIC_UNIT.CARD.EDIT_DIALOG.CODE'})}
                    withFeedbackLabel
                    labelWidth={4}
                    isHorizontal
                    label={intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.CODE'})}
                  />
                  {error !== '' && (
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-8">
                        <span className="text-danger">{error}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <Field
                    name="name"
                    component={MainInput}
                    labelWidth={4}
                    placeholder={intl.formatMessage({id: 'BASIC_UNIT.CARD.EDIT_DIALOG.NAME'})}
                    withFeedbackLabel
                    isHorizontal
                    label={intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.NAME'})}
                  />
                </div>
                <div className="mt-3 row">
                  <label className="col-md-4 mt-3">
                    {intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.STATUS'})}
                  </label>
                  <div className="col-md-8">
                    <div style={{marginLeft: '-1em'}}>
                      <Switch
                        checked={state.status}
                        onChange={handleChange}
                        color="primary"
                        name="status"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" onClick={() => handleSubmit()} className="btn btn-danger">
                <SaveOutlinedIcon style={iconStyle}/> Lưu
              </button>
              <button
                type="button"
                onClick={() => onHide('edit')}
                className="btn btn-outline-danger">
                <CancelOutlinedIcon style={iconStyle}/> Hủy
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export default BasicUnitForm;
