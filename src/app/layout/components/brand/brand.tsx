import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import objectPath from 'object-path';
import SVG from 'react-inlinesvg';
import {ToAbsoluteUrl} from '../../../common-library/helpers/assets-helpers';
import {useHtmlClassService} from '../../_core/metronic-layout';
import './brand.scss';

export function Brand() {
  const uiService: any = useHtmlClassService();
  
  const layoutProps = useMemo(() => {
    return {
      brandClasses: uiService.getClasses('brand', true),
      asideSelfMinimizeToggle: objectPath.get(uiService.config, 'aside.self.minimize.toggle'),
      headerLogo: uiService.getLogo(),
      headerStickyLogo: uiService.getStickyLogo(),
    };
  }, [uiService]);
  
  return (
    <>
      {/* begin::Brand */}
      <div className={`brand flex-column-auto ${layoutProps.brandClasses}`} id="kt_brand">
        {/* begin::Logo */}
        <Link to="" className="brand-logo">
          <img alt="logo" src={ToAbsoluteUrl('/media/logos/logoNew.png')} width="60px"/>
          {/* <SVG src={ToAbsoluteUrl('/media/svg/vncheck/logo.svg')} /> */}
        </Link>
        {/* end::Logo */}
        
        {layoutProps.asideSelfMinimizeToggle && (
          <>
            {/* begin::Toggle */}
            <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
              <span className="svg-icon svg-icon-sm">
                <SVG src={ToAbsoluteUrl('/media/svg/icons/Navigation/Angle-double-left.svg')}/>
              </span>
            </button>
            {/* end::Toolbar */}
          </>
        )}
      </div>
      {/* end::Brand */}
    </>
  );
}
