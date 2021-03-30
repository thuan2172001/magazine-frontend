/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown, Nav, OverlayTrigger, Tab, Tooltip } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SVG from 'react-inlinesvg';
import objectPath from 'object-path';
import { DropdownTopbarItemToggler } from '../../../../../_metronic/_partials/dropdowns';
import { ToAbsoluteUrl } from '../../../../common-library/helpers/assets-helpers';
import { useHtmlClassService } from '../../../_core/metronic-layout';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useIntersectionObserver, useNotification } from '../../../../hook/ultis.hook';
import moment from 'moment';
import _ from 'lodash';
import { Skeleton } from "antd";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

interface State {
  notification: any[];
  page: number;
  isLoading: boolean;
  hasMore: boolean;
  limit: number;
}

const defaultNotiState: State = {
  notification: [],
  page: 0,
  isLoading: false,
  hasMore: true,
  limit: 6,
};

export function UserNotificationsDropdown() {
  const [key, setKey] = useState('Events');
  const bgImage = ToAbsoluteUrl('/media/authImage/fruit7.jpg');
  const [notiArr, setNotiArr] = useState(defaultNotiState);
  const [notification, setPaging] = useNotification(notiArr.page, notiArr.limit);

  const uiService: any = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, 'extras.notifications.layout') === 'offcanvas',
    };
  }, [uiService]);

  const timer = useRef<any>(null);

  const [setNode] = useIntersectionObserver(() => getNoti(), notiArr);

  const getNoti = () => {
    if (notiArr.hasMore) {
      timer.current = setTimeout(() => {
        setPaging({ page: notiArr.page + 1, limit: notiArr.limit })
      }, 1500);
    }
  };

  useEffect(() => {
    if (!notification) return;

    const arr: any[] = _.isArray(notification.data) ? notification.data : [];

    setNotiArr({
      ...notiArr,
      notification: [...notiArr.notification, ...arr],
      page: notification.paging.page,
      hasMore: notification.paging.page < Math.ceil(notification.paging.total / notiArr.limit),
    });

    return () => clearTimeout(timer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <>
      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div
            className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-danger"
            id="kt_quick_notifications_toggle"
            
          >
            <span className="svg-icon svg-icon-xl svg-icon-danger">
              <SVG src={ToAbsoluteUrl('/media/svg/icons/Code/Compiling.svg')} />
            </span>
            <span className="pulse-ring" />
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" alignRight>
          <Dropdown.Toggle as={DropdownTopbarItemToggler} id="kt_quick_notifications_toggle">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="user-notification-tooltip">Thông báo</Tooltip>}>
              <div
                className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-danger"
                id="kt_quick_notifications_toggle"
                onClick={() => { 
                  setNotiArr(defaultNotiState);
                  setPaging({ page: defaultNotiState.page + 1, limit: defaultNotiState.limit })   
                 }}  
              >
                <span className="svg-icon svg-icon-xl svg-icon-danger">
                  <NotificationsIcon htmlColor={'#0B9446'} />
                </span>
                <span className="pulse-ring" />
                <span className="pulse-ring" />
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/** Head */}
              <div
                className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
                {/* <h4 className="d-flex flex-center rounded-top">
                  <span className="text-white font-weight-bolder">Thông báo</span>
                  <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">
                    {notiArr.notification.filter(item => item.isRead === false).length} 
                    Thông báo 
                    mới
                  </span>
                </h4> */}

                <Tab.Container defaultActiveKey={key}>
                  <Nav
                    as="ul"
                    className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                    onSelect={_key => setKey(_key ?? '')}>
                    {/* {NotificationNavItem.map((navItem, index) => {
                      return ( */}
                    <Nav.Item className="nav-item" as="li">
                      <Nav.Link eventKey="Events" className="nav-link show active">
                      </Nav.Link>
                    </Nav.Item>
                    {/* );
                    })} */}
                  </Nav>

                  <Tab.Content className="tab-content">
                    {/* {NotificationNavItem.map((navItem, key) => { */}
                    {notiArr.notification?.length > 0 ? (
                      <Tab.Pane eventKey="Events" key={key}>
                        <PerfectScrollbar
                          options={perfectScrollbarOptions}
                          className="navi navi-hover scroll my-4"
                          style={{ maxHeight: '300px', position: 'relative' }}>
                          {notiArr.notification.map((item: any, index: number) => {
                            return (
                              <a
                                href="#"
                                key={index}
                                className="navi-item bg-hover" style={{ backgroundColor: !item.isRead ? '#99ff99' : '' }}
                                ref={ref =>
                                  index === notiArr.notification.length - 1 ? setNode(ref) : null
                                }>
                                <div className="navi-link">
                                  <div className="navi-icon mr-2">
                                  <span className="svg-icon svg-icon-xl svg-icon-danger">
                  <NotificationsIcon htmlColor={'#0B9446'} />
                </span>
                                  </div>
                                  <div className="navi-text">
                                    <div className="font-weight-bold">{item.message}</div>
                                    <div className="text-muted">
                                      {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                          {notiArr.hasMore && <div className="navi-item px-6 pt-5" style={{ maxHeight: '55px' }}><Skeleton active avatar title={false} /></div>}
                        </PerfectScrollbar>
                      </Tab.Pane>
                    ) : (
                      <Tab.Pane eventKey="Events" className="p-8" key={key}>
                        Chưa có thông báo mới
                      </Tab.Pane>
                    )}
                    {/* })} */}
                  </Tab.Content>
                </Tab.Container>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
