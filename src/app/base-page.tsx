import React, {lazy, Suspense, useMemo} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ChangeUserPassword} from './pages/change-user-password';
import {LayoutSplashScreen} from './layout/_core/metronic-splash-screen';
import {ContentRoute} from './layout/components/content/content-route';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MainRoutes} from "./main-routes.data";
import {RootStateOrAny, useSelector} from "react-redux";
import {MenuItemModel} from "./layout/components/aside/aside-menu/menu-item-model";

const getRoute = (routes: MenuItemModel[], userInfo: any, basePath: string = ''): any[] => {
    return routes.map((r, i) => {
        const path = r.url ? (r.url.indexOf('/') === 0) ? r.url : `${basePath}/${r.url}` : basePath;
        if (r.component) return [{...r, path}];
        if (!r.children) return [];
        if (r.guard && !r.guard(userInfo)) return [];
        return getRoute(r.children, userInfo, path);
    }).reduce(
        (pre, cur) => ([...pre, ...cur]), []);
}
export default function BasePage() {
    const userInfo = useSelector(({auth}: { auth: RootStateOrAny }) => auth);

    const routes = useMemo(() => {
        return getRoute(MainRoutes, userInfo);
    }, [userInfo]);
    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <ToastContainer/>

            <Switch>
                <Redirect exact from="/" to="/dashboard"/>
                <ContentRoute
                    children={null}
                    path="/change-password"
                    component={ChangeUserPassword}
                    render={null}
                />
                {routes.map(t => (<Route path={t.path} component={t.component}/>))}
                <Redirect to="/error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
