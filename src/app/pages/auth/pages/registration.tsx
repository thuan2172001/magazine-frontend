import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import * as auth from '../_redux/auth-redux';
import {GetCredential} from '../_redux/auth.service';
import {TextField} from '@material-ui/core';
// eslint-disable-next-line no-restricted-imports
import {makeStyles} from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues:any = {

};

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      backgroundColor: 'white',
    },
  },
}));

const LoginUsername = ({ saveUserInfo, intl, location }: { saveUserInfo?: any; intl?: any; location?: any }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [invalidUsername, setInvalidUsername] = useState(false);
  const {search} = window.location;
  let callbackUrl = new URLSearchParams(search).get('callbackUrl');
  console.log(window.location);
  const errorMessage = new URLSearchParams(search).get('errorMessage');
  useEffect(() => {
    if (errorMessage && errorMessage != 'null' && errorMessage != 'undefined') {
      formik.setStatus(intl.formatMessage({id: errorMessage}));
    }
  }, [errorMessage]);
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
  });

  const submitUsername =
    ({username}: any, {setStatus, setSubmitting}: { setStatus: any; setSubmitting: any }) => {
      setLoading(true);
      setTimeout(() => {
        GetCredential(username)
          .then(response => {
            console.log(response.data);
            const {
              encryptedPrivateKey,
              publicKey,
              username,
            }: {
              encryptedPrivateKey: string;
              publicKey: string;
              username: string;
            } = response.data;
            const fullName = (response.data.fullName) ? response.data.fullName : (response.data.firstName + ' ' + response.data.lastName);
            localStorage.setItem('userInfo', JSON.stringify({username, fullName}));
            saveUserInfo({
              ...response.data,
              fullName: response.data.fullName ? response.data.fullName : response.data.firstName + ' ' + response.data.lastName,
            });
            history.push('/auth/login/challenge?callbackUrl=' + callbackUrl);
          })
          .catch(err => {
            setLoading(false);
            setSubmitting(false);
            setStatus(intl.formatMessage({id: 'AUTH.VALIDATION.INVALID_USERNAME'}),
            );
            setInvalidUsername(true);
          });
      }, 200);
    };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: submitUsername,
  });

  return (
    <div
      className="login-form login-signin p-5"
      id="kt_login_signin_form"
      style={{zIndex: 1}}   //   style={{
      //     background: `linear-gradient(to right, rgba(21.96%, 17.25%, 21.96%, 0.55) 150px, rgba(27.06%, 25.88%, 27.06%, 0.41) 100%)`,
      //     borderRadius: 10,
      //   }}
    >
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-10">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE"/>
        </h3>
        <p className="text-muted font-weight-bold">
          <FormattedMessage id="AUTH.LOGIN.TITLE"/>
          Vui lòng nhập tên đăng nhập của bạn
        </p>
      </div>
      {/* end::Head */}
      
      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework">
        <div className="form-group fv-plugins-icon-container">
          {/* <input
            placeholder="Username"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'username',
            )}`}
            name="username"
            {...formik.getFieldProps('username')}
          /> */}
          <TextField
            id="outlined-basic"
            autoFocus
            className={`form-control form-control-solid h-auto`}
            label="Tên đăng nhập"
            variant="outlined"
            // name="username"
            // onClick={() => alert('cc')}
            
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
          {formik.status && <span className="text-danger font-weight-bold"><ErrorIcon/> {formik.status}</span>}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link tabIndex={-1}
                to="/auth/forgot-password"
                className="text-dark-50 text-hover-primary my-3 mr-2"
                id="kt_login_forgot">
            <p className="text-muted font-weight-bold"/>
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            style={{zIndex:1}}
            className={`btn btn-danger font-weight-bold px-9 py-4 my-3`}>
            <span>Tiếp theo</span>
            {loading && <span className="ml-3 spinner spinner-white"/>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
};

export default injectIntl(connect(null, auth.actions)(LoginUsername));
