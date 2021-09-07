/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {Fragment, ReactElement} from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import {useIntl} from 'react-intl';
import '../aside.scss';
import {CheckIsActive} from '../../../../common-library/helpers/router-helpers';
import {MenuItemModel} from './menu-item-model';
import {MainRoutes} from '../../../../main-routes.data';
import {ToAbsoluteUrl} from '../../../../common-library/helpers/assets-helpers';
import SVG from 'react-inlinesvg';
import {RootStateOrAny, useSelector} from "react-redux";

export function AsideMenuList({layoutProps}: any) {
  const intl = useIntl();
  const location = useLocation();
  const userInfo = useSelector(({auth}: { auth: RootStateOrAny }) => auth);

  const getMenuItemActive = (url?: string, hasSubmenu = false) => {
    return CheckIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
      : '';
  };
  const MenuItem = (item: MenuItemModel, index: number, basePath: string = ''): ReactElement | null => {
    if (item.display != null && !item.display) return null;
    const children = item.children ? item.children.filter( r => !r.guard || r.guard(userInfo)):[];
    const hasSubmenu = children.length > 0;
    const path = item.url ? (item.url.indexOf('/') === 0) ? item.url : `${basePath}/${item.url}` : basePath;
    if (item.section) {
      return (
        <Fragment key={'menuitem_' + index}>
          <li className="menu-section " key={'menuitem_' + index} style={{color: '#0B9446'}}>
            <h4 className="menu-text title" style={{color: '#0B9446'}}>
              {intl.formatMessage({id: item.title})}
            </h4>
            <i className="menu-icon flaticon-more-v2"/>
          </li>
          {children.map((item, index) => MenuItem(item,index,path))}
        </Fragment>
      );
    } else if (hasSubmenu) {
      return (
        <li
          key={'menuitem_' + index}
          className={`menu-item menu-item-submenu ${getMenuItemActive(path, hasSubmenu)}`}
          aria-haspopup="true"
          data-menu-toggle="hover">
          <NavLink className="menu-link menu-toggle" to={path}>
            {item.icon && !item.parent ? (
              <span className="svg-icon menu-icon">
                {typeof item.icon == 'string' ? (
                  <SVG
                    style={{width: '15px'}}
                    src={ToAbsoluteUrl('/media/svg/vncheck/' + item.icon)}
                  />
                ) : (
                  item.icon
                )}
              </span>
            ) : (
                <div
                    className={'menu-text-icon'}>
                  {intl.formatMessage({id: item.title})[0]}
                </div>
            )}
            <span className={item.parent ? 'menu-text title' : 'menu-text'}>
              {intl.formatMessage({id: item.title})}
            </span>
            <i className="menu-arrow"/>
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow"/>
            <ul className="menu-subnav">
              {item.parent && (
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text title">
                      {intl.formatMessage({id: item.title})}
                    </span>
                  </span>
                </li>
              )}
              {children.map((item, index) => MenuItem(item,index,path))}
            </ul>
          </div>
        </li>
      );
    } else
      return (
        <li
          key={'menuitem_' + index}
          className={`menu-item ${getMenuItemActive(path, hasSubmenu)}`}
          aria-haspopup="true">
          <NavLink className="menu-link" to={path}>
            {item.icon ? (
              <span className="svg-icon menu-icon">
                {typeof item.icon == 'string' ? (
                  <SVG
                    style={{width: '15px'}}
                    src={ToAbsoluteUrl('/media/svg/vncheck/' + item.icon)}
                  />
                ) : (
                  item.icon
                )}
              </span>
            ) : (
                <div
                    className={'menu-text-icon'}>
                  {intl.formatMessage({id: item.title})[0]}
                </div>
            )}
            <span
              className={item.parent ? 'menu-text title' : 'menu-text'}>{intl.formatMessage({id: item.title})}</span>
          </NavLink>
        </li>
      );
  };
  return (
    <ul className={`menu-nav ${layoutProps.ulClasses}`}>
      {MainRoutes.filter( r => !r.guard || r.guard(userInfo)).map((me, index) => {
        return MenuItem(me, index);
      })}
    </ul>
  );
}
