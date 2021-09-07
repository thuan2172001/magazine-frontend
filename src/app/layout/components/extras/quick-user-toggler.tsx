/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import objectPath from 'object-path';
import { UserProfileDropdown } from './dropdowns/user-profile-dropdown';
import { useHtmlClassService } from '../../_core/metronic-layout';

export function QuickUserToggler() {
  const user = useSelector((state: any) => state.auth);
  const uiService: any = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, 'extras.user.layout') === 'offcanvas',
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-user-tooltip">View user</Tooltip>}>
          <div className="topbar-item">
            <div
              className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
              id="kt_quick_user_toggle">
              <>
                {/* <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                  Hi,
                </span>
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                  {user.fullName}
                </span> */}
                <span className="symbol symbol-35 symbol-light-danger">
                  <span
                    className="symbol-label font-size-h5 font-weight-bold"
                    style={{ color: 'white', background: '#0B9446' }}>
                    {user.fullName ? user.fullName[0].toUpperCase() : 'S'}
                  </span>
                </span>
              </>
            </div>
          </div>
        </OverlayTrigger>
      )}

      {!layoutProps.offcanvas && <UserProfileDropdown />}
    </>
  );
}
