import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ErrorPage1} from "./error-page1";
import {ErrorPage2} from "./error-page2";
import {ErrorPage3} from "./error-page3";
import {ErrorPage4} from "./error-page4";
import {ErrorPage5} from "./error-page5";
import {ErrorPage6} from "./error-page6";

export default function ErrorsPage() {
  return (
    <Switch>
      <Redirect from="/error" exact={true} to="/error/error-v1"/>
      <Route path="/error/error-v1" component={ErrorPage1}/>
      <Route path="/error/error-v2" component={ErrorPage2}/>
      <Route path="/error/error-v3" component={ErrorPage3}/>
      <Route path="/error/error-v4" component={ErrorPage4}/>
      <Route path="/error/error-v5" component={ErrorPage5}/>
      <Route path="/error/error-v6" component={ErrorPage6}/>
    </Switch>
  );
}
