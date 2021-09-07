import React, {useState} from 'react';
import {useFormik} from 'formik';
import {connect, RootStateOrAny, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import {FormattedMessage, injectIntl} from 'react-intl';
import * as auth from '../_redux/auth-redux';
import {Ping, SetPassword, SetTempPassword,} from '../_redux/auth.service';
import {GenerateKeyPair, SignMessage, SymmetricEncrypt} from '../service/auth-cryptography';
import {CERTIFICATE_EXP} from '../../../common-library/common-consts/enviroment';
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  createMuiTheme,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MuiThemeProvider,
  OutlinedInput,
  Tooltip
} from "@material-ui/core";

const initialValues = {
  newPassword: '',
  repeatNewPassword: '',
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
        // color: "yellow",
        // backgroundColor: "red",
      }
    }
  }
})

interface State {
  newPassword: string;
  repeatNewPassword: string;
  showNewPassword: boolean;
  showPassword: boolean;
}

function ChangePassword(props: {
  saveNewPassword?: any;
  saveUserInfo?: any;
  savePingErrorData?: any;
  intl?: any;
}) {
  const {intl} = props;
  const [loading, setLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  
  const history = useHistory();
  
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    newPassword: '',
    repeatNewPassword: '',
    showNewPassword: false,
    showPassword: false,
  });
  
  const location = window.location;
  const {pathname} = location;
  const {search} = location;
  let callbackUrl = new URLSearchParams(search).get('callbackUrl');
  callbackUrl = callbackUrl ? callbackUrl : pathname;
  const userInfo = useSelector(({auth}: { auth: RootStateOrAny }) => auth);
  console.log(userInfo);
  const ChangePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
    repeatNewPassword: Yup.string()
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      )
      .when('newPassword', {
        is: val => (!!(val && val.length > 0)),
        then: Yup.string().oneOf(
          [Yup.ref('newPassword')],
          "New Password and Confirm New Password didn't match",
        ),
      }),
  });
  
  const handleClickShowPassword = (prop: keyof State, show: boolean) => {
    setValues({...values, [prop]: !show});
  };
  
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const logoutClick = () => {
    const toggle = document.getElementById('kt_quick_user_toggle');
    if (toggle) {
      toggle.click();
    }
    const currentLocal: any = JSON.parse(localStorage.getItem('persist:vncheck') || '{}');
    console.log(currentLocal);
    const resetLocal = {
      _persist: currentLocal._persist,
    };
    localStorage.setItem('persist:vncheck', JSON.stringify(resetLocal));
    history.push('/logout?callbackUrl=' + callbackUrl);
  };
  const GenerateCertificate = (
    certificateInfo: { username: string; timestamp: Date; exp: number },
    privateKey: string,
  ) => {
    const keyPair = GenerateKeyPair(privateKey);
    const signature = SignMessage(privateKey, certificateInfo);
    return {signature, certificateInfo, publicKey: keyPair.publicKey};
  };
  const changePassword = (
    {newPassword, privateKey}: { newPassword: string; privateKey: string },
    {setStatus, setSubmitting}: { setStatus: any; setSubmitting: any },
  ) => {
    const keyPair = GenerateKeyPair(null);
    const encryptedPrivateKey = SymmetricEncrypt(keyPair.privateKey, newPassword);
    const data = {
      publicKey: keyPair.publicKey,
      encryptedPrivateKey,
    };
    SetTempPassword(data).then(res => {
      //TODO:SetPasswordToBlockchain()
      console.log(1111111111111111111);
      SetPassword(data).then(res => {
        //TODO:Save new credential
        
        const certificate = GenerateCertificate(
          {
            username: userInfo.username,
            timestamp: new Date(),
            exp: CERTIFICATE_EXP,
          },
          keyPair.privateKey,
        );
        console.log(userInfo);
        props.saveNewPassword({
          publicKey: keyPair.publicKey,
          _certificate: certificate,
          _privateKey: keyPair.privateKey,
        });
        Ping(certificate)
          .then(res => {
            console.log(res);
            props.saveUserInfo({
              ...res.data,
              // fullName: res.data.first_name + ' ' + res.data.last_name,
              _certificate: certificate,
              _privateKey: keyPair.privateKey,
              _preLoggedIn: false,
            });
            const location = window.location;
            const {pathname} = location;
            const {search} = location;
            const temp = new URLSearchParams(search).get('callbackUrl');
            let callbackUrl = temp ? temp : pathname;
            history.push(callbackUrl);
            // window.location.reload()
          })
          .catch(err => {
            props.savePingErrorData(err.response.data);
          });
      });
    });
  };
  
  const formik = useFormik({
    initialValues,
    validationSchema: ChangePasswordSchema,
    onSubmit: (values, ob) => {
      return changePassword({...values, privateKey: userInfo.privateKey}, ob);
    },
  });
  return (
    <>
      <div className="login-form login-signin" style={{display: 'block',zIndex: 1}}>
        <div className="text-center mb-10 mb-lg-10">
          <h3 className="font-size-h1">
            <FormattedMessage id="AUTH.CHANGEPASSWORD.TITLE"/>
          </h3>
          <p className="text-muted font-weight-bold">{intl.formatMessage({id: 'AUTH.CHANGEPASSWORD.SUB_TITLE'})}</p>
        </div>
        
        <form
          id="kt_login_signin_form"
          className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          onSubmit={formik.handleSubmit}>
          {/* begin: Alert */}
          {formik.status && (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}
          {/* end: Alert */}
          
          {/* begin: Password */}
          <div className="form-group fv-plugins-icon-container">
            <FormControl
              className={clsx(classes.margin, classes.textField) + ' form-control w-100'}
              variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password">{intl.formatMessage({id: 'AUTH.INPUT.PASSWORD'})}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showNewPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <MuiThemeProvider theme={theme}>
                      {
                        values.showNewPassword ? (
                          <Tooltip title={intl.formatMessage({id: 'AUTH.BUTTON.HIDEPASSWORD'})} placement="right-end"
                                   tabIndex={-1}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={e =>
                                handleClickShowPassword('showNewPassword', values.showNewPassword)
                              }
                              onMouseDown={handleMouseDownPassword}
                              edge="end">
                              <Visibility/>
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title={intl.formatMessage({id: 'AUTH.BUTTON.SHOWPASSWORD'})} placement="right-end"
                                   tabIndex={-1}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={e =>
                                handleClickShowPassword('showNewPassword', values.showNewPassword)
                              }
                              onMouseDown={handleMouseDownPassword}
                              edge="end">
                              <VisibilityOff/>
                            </IconButton>
                          </Tooltip>
                        )
                      }
                    
                    </MuiThemeProvider>
                  </InputAdornment>
                }
                labelWidth={70}
                {...formik.getFieldProps('newPassword')}
              />
            </FormControl>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.newPassword}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group fv-plugins-icon-container">
            <FormControl
              className={clsx(classes.margin, classes.textField) + ' form-control w-100'}
              variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password">{intl.formatMessage({id: 'AUTH.INPUT.CONFIRM_PASSWORD'})}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-2"
                type={values.showPassword ? 'text' : 'password'}
                // value={values.repeatNewPassword}
                // onChange={handleChange('repeatNewPassword')}
                // name="repeatNewPassword"
                endAdornment={
                  <InputAdornment position="end">
                    <MuiThemeProvider theme={theme}>
                      {values.showPassword ? (
                        <Tooltip title={intl.formatMessage({id: 'AUTH.BUTTON.HIDEPASSWORD'})} placement="right-end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={e => handleClickShowPassword('showPassword', values.showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title={intl.formatMessage({id: 'AUTH.BUTTON.SHOWPASSWORD'})} placement="right-end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={e => handleClickShowPassword('showPassword', values.showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton>
                        </Tooltip>
                      )}
                    
                    </MuiThemeProvider>
                  </InputAdornment>
                }
                labelWidth={70}
                {...formik.getFieldProps('repeatNewPassword')}
              />
            </FormControl>
            {formik.touched.repeatNewPassword && formik.errors.repeatNewPassword ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.repeatNewPassword}</div>
              </div>
            ) : null}
          </div>
          {/* end: Confirm Password */}
          
          <div className="form-group d-flex flex-wrap flex-center">
            <button type="submit" className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4">
              <FormattedMessage id="AUTH.CHANGE_PASSWORD.CONFIRM"/>
              {loading && <span className="ml-3 spinner spinner-white"/>}
            </button>
            
            <button
              type="button"
              className="btn btn-outline-primary font-weight-bold px-9 py-4 my-3 mx-4"
              onClick={logoutClick}>
              <FormattedMessage id="AUTH.CHANGE_PASSWORD.LOGOUT"/>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ChangePassword));
