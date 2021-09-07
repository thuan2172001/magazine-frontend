import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import {Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import objectPath from 'object-path';
import {SearchResult} from './search-result';
import {ToAbsoluteUrl} from "../../../../../common-library/helpers/assets-helpers";
import {useHtmlClassService} from "../../../../_core/metronic-layout";
import {DropdownTopbarItemToggler} from "../../../../../common-library/dropdowns/dropdown-topbar-item-toggler";

const fakeData = [
  {
    type: 0,
    text: 'Reports',
  },
  {
    type: 1,
    text: 'AirPlus Requirements',
    description: 'by Grog John',
    iconImage: ToAbsoluteUrl('/media/files/doc.svg'),
  },
  {
    type: 1,
    text: 'TechNav Documentation',
    description: 'by Mary Brown',
    iconImage: ToAbsoluteUrl('/media/files/pdf.svg'),
  },
  {
    type: 1,
    text: 'All Framework Docs',
    description: 'by Grog John',
    iconImage: ToAbsoluteUrl('/media/files/zip.svg'),
  },
  {
    type: 1,
    text: 'AirPlus Requirements',
    description: 'by Tim Hardy',
    iconImage: ToAbsoluteUrl('/media/files/xml.svg'),
  },
  {
    text: 'Customers',
    type: 0,
  },
  {
    type: 1,
    text: 'Jimmy Curry',
    description: 'Software Developer',
    iconImage: ToAbsoluteUrl('/media/users/300_11.jpg'),
  },
  {
    type: 1,
    text: 'Milena Gibson',
    description: 'UI Designer',
    iconImage: ToAbsoluteUrl('/media/users/300_16.jpg'),
  },
  {
    type: 1,
    text: 'Stefan JohnStefan',
    description: 'Marketing Manager',
    iconImage: ToAbsoluteUrl('/media/users/300_22.jpg'),
  },
  {
    type: 1,
    text: 'Anna Strong',
    description: 'Software Developer',
    iconImage: ToAbsoluteUrl('/media/users/300_5.jpg'),
  },
  {
    type: 0,
    text: 'Files',
  },
  {
    type: 1,
    text: '2 New items submitted',
    description: 'Marketing Manager',
    iconClassName: 'flaticon2-box font-danger',
  },
  {
    type: 1,
    text: '79 PSD files generated',
    description: 'by Grog John',
    iconClassName: 'flaticon-psd font-brand',
  },
  {
    type: 1,
    text: '$2900 worth products sold',
    description: 'Total 234 items',
    iconClassName: 'flaticon2-supermarket font-warning',
  },
  {
    type: 1,
    text: '4 New items submitted',
    description: 'Marketing Manager',
    iconClassName: 'flaticon-safe-shield-protection font-info',
  },
];

export function SearchDropdown() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  let timeoutId: any;
  
  const clearTimeout = () => {
    if (timeoutId) {
      clearTimeout();
      timeoutId = undefined;
    }
  };
  
  const handleSearchChange = (event: any) => {
    setData(null);
    setSearchValue(event.target.value);
    
    if (event.target.value.length > 2) {
      clearTimeout();
      
      setLoading(true);
      
      // simulate getting search result
      timeoutId = setTimeout(() => {
        setData(fakeData);
        setLoading(false);
      }, 500);
    }
  };
  
  const clear = () => {
    setData(null);
    setSearchValue('');
  };
  
  useEffect(() => {
    return () => {
      clearTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const uiService: any = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, 'extras.search.layout') === 'offcanvas',
    };
  }, [uiService]);
  
  return (
    <>
      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div className="btn btn-icon btn-clean btn-lg mr-1" id="kt_quick_search_toggle">
            <span className="svg-icon svg-icon-xl svg-icon-danger">
              <SVG src={ToAbsoluteUrl('/media/svg/icons/General/Search.svg')}/>
            </span>
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown
          alignRight
          drop="down"
          onToggle={() => {
            setData(null);
            setLoading(false);
            setSearchValue('');
          }}
          id="kt_quick_search_toggle">
          <Dropdown.Toggle as={DropdownTopbarItemToggler as any} id={'hel'}>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="search-panel-tooltip">Quick search</Tooltip>}>
              <div className="btn btn-icon btn-clean btn-lg btn-dropdown mr-1">
                <span className="svg-icon svg-icon-xl svg-icon-danger">
                  <SVG src={ToAbsoluteUrl('/media/svg/icons/General/Search.svg')}/>
                </span>
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <div
              id="kt_quick_search_dropdown"
              className={clsx('quick-search quick-search-dropdown', {
                'quick-search-has-result': data && data.length,
              })}>
              <form className="quick-search-form">
                <div className="input-group">
                  <div className={`input-group-prepend`}>
                    <span className="input-group-text">
                      <span className="svg-icon svg-icon-lg">
                        <SVG src={ToAbsoluteUrl('/media/svg/icons/General/Search.svg')}/>
                      </span>
                    </span>
                  </div>
                  <input
                    type="text"
                    autoFocus={true}
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="form-control"
                  />
                  
                  <div
                    className={`input-group-append ${
                      loading ? 'spinner spinner-sm spinner-primary' : ''
                    }")}`}>
                    <span className="input-group-text">
                      <i
                        style={{
                          display:
                            loading && searchValue && searchValue.length > 0 ? 'none' : 'flex',
                        }}
                        onClick={clear}
                        className="quick-search-close ki ki-close icon-sm text-muted"
                      />
                    </span>
                  </div>
                </div>
              </form>
              <SearchResult data={data}/>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
