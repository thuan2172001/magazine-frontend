import React, {useState} from 'react';
import {useFormik} from 'formik';
import {connect} from 'react-redux';
import {Link, Redirect, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {injectIntl} from 'react-intl';
import * as auth from '../_redux/auth-redux';
import {TextField} from '@material-ui/core';

const initialValues = {
  verifyCode: '',
};

function VerificationCode(props: { intl: any }) {
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
      // requestPassword(values.email)
      //   .then(() => setIsRequested(true))
      //   .catch(() => {
      //     setIsRequested(false);
      //     setSubmitting(false);
      //     setStatus(
      //       intl.formatMessage({ id: 'AUTH.VALIDATION.NOT_FOUND' }, { name: values.email }),
      //     );
      //   });
      history.push('/auth/change-password?callbackUrl=' + callbackUrl);
    },
  });
  
  return (
    <>
      {isRequested && <Redirect to="/auth"/>}
      {!isRequested && (
        <div className="login-form login-forgot" style={{display: 'block',zIndex: 1}}>
          <div className="text-center mb-10 mb-lg-10">
            <h3 className="font-size-h1">Nhập mã xác minh</h3>
            <div className="text-muted font-weight-bold">
              Mã xác minh được gửi về email hoặc số điện thoại của bạn
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp">
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">{formik.status}</div>
              </div>
            )}
            <div className="form-group fv-plugins-icon-container">
              {/* <input
                type="email"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  'email',
                )}`}
                name="email"
                {...formik.getFieldProps('email')}
              /> */}
              <TextField
                id="outlined-basic"
                autoFocus
                className={`form-control form-control-solid h-auto`}
                label="Mã xác minh"
                placeholder="Vui lòng nhập mã xác minh"
                variant="outlined"
                // name="username"
                // onClick={() => alert('cc')}
                
                {...formik.getFieldProps('verifyCode')}
              />
              {formik.touched.verifyCode && formik.errors.verifyCode ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.verifyCode}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
              <Link
                to="/auth/forgot-password"
                className="text-dark-50 text-hover-primary my-3 mr-2"
                id="kt_login_forgot">
                <p className="text-muted font-weight-bold">Không nhận được mã?</p>
              </Link>
              <div>
                <button
                  id="kt_login_forgot_submit"
                  type="submit"
                  className="btn btn-danger font-weight-bold mx-2"
                  disabled={formik.isSubmitting}>
                  Tiếp theo
                </button>
                <Link to={`/auth/login/challenge?callbackUrl=${callbackUrl}`}>
                  <button
                    type="button"
                    id="kt_login_forgot_cancel"
                    className="btn btn-outline-danger font-weight-bold">
                    Hủy bỏ
                  </button>
                </Link>
              </div>
            </div>
            {/* <div className="form-group d-flex flex-wrap flex-center">
            
            </div> */}
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(VerificationCode));
