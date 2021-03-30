import React from 'react';
import {Card, CardBody, CardHeader} from '../../common-library/card';
import {useIntl} from 'react-intl';
import {Field, Formik} from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import {Input} from '../../common-library/forms/input';

function BasicUnitCardHeader({basicUnitSearch}: any) {
  const intl = useIntl();
  
  const handleResetForm = (resetForm: any) => {
    resetForm();
    const initValue = {
      code: '',
      name: '',
    };
    basicUnitSearch(initValue);
  };
  
  return (
    <Card>
      <CardHeader title={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.TITLE'})}/>
      <CardBody>
        <Formik
          initialValues={{
            code: '',
            name: '',
          }}
          onSubmit={values => {
            basicUnitSearch(values);
          }}>
          {({values, handleSubmit, handleBlur, handleChange, setFieldValue, resetForm}) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row">
                <div className="col-xxl-3 col-md-3 mt-md-0 mt-5">
                  <Field
                    name="code"
                    component={Input}
                    placeholder={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.CODE_INPUT'})}
                    label={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.CODE'})}
                    withFeedbackLabel={true}
                  />
                </div>
                
                <div className="col-xxl-3 col-md-3 mt-md-0 mt-5">
                  <Field
                    name="name"
                    component={Input}
                    placeholder={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.NAME_INPUT'})}
                    label={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.NAME'})}
                    withFeedbackLabel={true}
                  />
                </div>
              </div>
              <div>
                <button className="btn btn-danger" type="submit">
                  <SearchIcon/>
                  {intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.BUTTON.SEARCH'})}
                </button>
                <button
                  className="btn btn-outline-danger ml-5"
                  type="reset"
                  onClick={() => handleResetForm(resetForm)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.125 4.99362L12.5064 4.375L10.5 6.38138L8.49362 4.375L7.875 4.99362L9.88138 7L7.875 9.00594L8.49406 9.625L10.5 7.61862L12.5068 9.625L13.125 9.00681L11.1186 7L13.125 4.99362Z"
                      fill="currentColor"
                    />
                    <path
                      d="M1.75 1.75C1.51794 1.75 1.29538 1.84219 1.13128 2.00628C0.967187 2.17038 0.875 2.39294 0.875 2.625V4.01188C0.874967 4.12685 0.897592 4.2407 0.941583 4.34692C0.985573 4.45314 1.05007 4.54965 1.13138 4.63094L4.375 7.875V11.375C4.375 11.6071 4.46719 11.8296 4.63128 11.9937C4.79538 12.1578 5.01794 12.25 5.25 12.25H7C7.23206 12.25 7.45462 12.1578 7.61872 11.9937C7.78281 11.8296 7.875 11.6071 7.875 11.375V10.5H7V11.375H5.25V7.51188L4.99362 7.25594L1.75 4.01231V2.625H10.5V3.5H11.375V2.625C11.375 2.39294 11.2828 2.17038 11.1187 2.00628C10.9546 1.84219 10.7321 1.75 10.5 1.75H1.75Z"
                      fill="currentColor"
                    />
                  </svg>
                  &nbsp;
                  {intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.BUTTON.RESET_FILTER'})}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}

export default BasicUnitCardHeader;
