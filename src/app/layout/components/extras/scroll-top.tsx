import React from "react";
import SVG from "react-inlinesvg";
import {ToAbsoluteUrl} from "../../../common-library/helpers/assets-helpers";

export function ScrollTop() {
    return (
        <div id="kt_scrolltop" className="scrolltop">
        <span className="svg-icon">
          <SVG src={ToAbsoluteUrl("/media/svg/icons/Navigation/Up-2.svg")}/>
        </span>{" "}
        </div>
    );
}
