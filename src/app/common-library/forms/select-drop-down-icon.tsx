import React from 'react';
import SVG from "react-inlinesvg";
import {ToAbsoluteUrl} from '../helpers/assets-helpers';

const SelectDropDownIcon = () => {
  return (
    // <div className='d-flex'>
    <span style={{color: "#B5B5C3"}} className=" pb-1 pl-1 svg-icon-primary d-flex align-items-center">
        <SVG style={{width: '24px', height: '24px'}} src={ToAbsoluteUrl('/media/svg/vncheck/select-dropdown.svg')}/>
      </span>
    // </div>
  )
}

export default SelectDropDownIcon;
