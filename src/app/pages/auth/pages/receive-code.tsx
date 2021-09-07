import React, {useState} from 'react';
import {useFormik} from 'formik';
import {connect} from 'react-redux';
import {Link, Redirect, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {injectIntl} from 'react-intl';
import * as auth from '../_redux/auth-redux';
import {Form} from 'react-bootstrap';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';

const initialValues = {
  code: '',
};

function ReceiveCode(props: { intl: any }) {
  const {intl} = props;
  const [isRequested, setIsRequested] = useState(false);
  const location = window.location;
  const {pathname} = location;
  const {search} = location;
  let callbackUrl = new URLSearchParams(search).get('callbackUrl');
  callbackUrl = callbackUrl ? callbackUrl : pathname;
  
  const history = useHistory();
  const ForgotPasswordSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email('Wrong email format')
    //   .min(3, 'Minimum 3 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .required(
    //     intl.formatMessage({
    //       id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    //     }),
    //   ),
  });
  
  // const getInputClasses = fieldname => {
  //   if (formik.touched[fieldname] && formik.errors[fieldname]) {
  //     return 'is-invalid';
  //   }
  
  //   if (formik.touched[fieldname] && !formik.errors[fieldname]) {
  //     return 'is-valid';
  //   }
  
  //   return '';
  // };
  
  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      history.push('/auth/verify-code?callbackUrl=' + callbackUrl);
      //   requestPassword(values.email)
      //     .then(() => setIsRequested(true))
      //     .catch(() => {
      //       setIsRequested(false);
      //       setSubmitting(false);
      //       setStatus(
      //         intl.formatMessage({ id: 'AUTH.VALIDATION.NOT_FOUND' }, { name: values.email }),
      //       );
      //     });
    },
  });
  
  return (
    <>
      {isRequested && <Redirect to="/auth"/>}
      {!isRequested && (
        <div className="login-form login-forgot" style={{display: 'block',zIndex: 1}}>
          <div className="text-center mb-10 mb-lg-10">
            <h3 className="font-size-h1">Phương thức nhận mã</h3>
            <div className="text-muted font-weight-bold">Chọn phương thức để nhận mã xác minh</div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp d-flex align-items-center flex-column">
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">{formik.status}</div>
              </div>
            )}
            <div className="form-group fv-plugins-icon-container ">
              <Form.Check
                type="radio"
                label={
                  <div>
                    <p>
                      Gửi mã qua email <MailOutlineIcon className="ml-2"/>
                    </p>
                    <p> *********@gmail.com</p>
                  </div>
                }
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value="email"
              />
              <Form.Check
                type="radio"
                label={
                  <div>
                    <p>
                      Gửi mã qua SMS <SmsOutlinedIcon className="ml-2"/>
                    </p>
                    <p> 09******89m</p>
                  </div>
                }
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                value="sms"
              />
            </div>
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-danger font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}>
                Gửi đi
              </button>
              <Link to={`/auth/login/challenge?callbackUrl=${callbackUrl}`}>
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-outline-danger font-weight-bold px-9 py-4 my-3 mx-4">
                  Hủy bỏ
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ReceiveCode));
