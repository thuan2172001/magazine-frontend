/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * common-library (e.g: `src/app/modules/auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BasePage from './base-page';
import { Layout } from './layout/components/layout';
import ErrorsPage from './layout/errors/errors-page';
import { AuthPage, Logout } from './pages/auth';
import store from '../redux/store';
import FoodTraceability from './pages/food-traceability/food-traceability';

export function Routes() {
  const userInfo = useSelector(({ auth }: any) => auth);
  const location = useLocation()
  const { pathname } = location;
  const { search } = location;
  const temp = new URLSearchParams(search).get('callbackUrl');
  let callbackUrl = temp ? temp : pathname;
  const isAuthUrls = callbackUrl.indexOf('/logout') > -1 || callbackUrl.indexOf('/auth/') > -1;
  callbackUrl = !isAuthUrls ? callbackUrl : '/';
  const isLoggedInAndUnexpired = () => {
    const unexpired = () => {
      const expiredTime = new Date(userInfo._certificate.certificateInfo.timestamp);
      expiredTime.setSeconds(expiredTime.getSeconds() + userInfo._certificate.certificateInfo.exp);
      return expiredTime.getTime() > new Date().getTime();
    };
    return userInfo._certificate && !userInfo._preLoggedIn && unexpired();
  };

  let username = location.pathname === '/auth/login/identifier' ? null : userInfo.username;
  const isNeedChangePassword = userInfo?._error === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD';
  const errorMessage = !isNeedChangePassword
    ? userInfo?._error
    : new URLSearchParams(search).get('errorMessage');
  const CheckAuth = () => {
    const state: any = store.getState();
    // const username = state.auth.username;
    if (isNeedChangePassword) {
      return (
        <Route>
          <AuthPage />
          <Redirect to={`/auth/change-password?callbackUrl=${callbackUrl}`} />
        </Route>
      );
    } else if (isLoggedInAndUnexpired()) {
      if (pathname.indexOf('/auth/change-password') > -1) {
        console.log(pathname);
        return (
          <Route>
            <AuthPage />
            <Redirect to={`/auth/change-password?callbackUrl=${callbackUrl}`} />
          </Route>
        );
      }
      return [
        <Redirect from={'/auth'} to={callbackUrl} key={'r_base'} />,
        <Layout key={'base'}>
          <BasePage />
        </Layout>,
      ];
    } else {
      return (
        <Route>
          <AuthPage />
          {username ? (
            <Route>
              <Redirect to={`/auth/login/challenge?callbackUrl=${callbackUrl}`} />
            </Route>
          ) : (
            <Route>
              <Redirect
                to={`/auth/login/identifier?callbackUrl=${callbackUrl}&errorMessage=${errorMessage}`}
              />
            </Route>
          )}
        </Route>
      );
    }
  };
  return (
    <Switch>
      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />
      <Route path="/food-traceability/:id">
        {({ history, match }) => <FoodTraceability id={match?.params.id} />}
      </Route>
      {CheckAuth()}
    </Switch>
  );
}
