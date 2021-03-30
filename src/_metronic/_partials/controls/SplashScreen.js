import React from "react";
import {CircularProgress} from "@material-ui/core";
import {ToAbsoluteUrl} from "../../../app/common-library/helpers/assets-helpers";

export function SplashScreen() {
    return (
        <>
            <div className="splash-screen">
                <img
                    src={ToAbsoluteUrl("/media/logos/logo-mini-md.png")}
                    alt="Metronic logo"
                />
                <CircularProgress className="splash-screen-spinner"/>
            </div>
        </>
    );
}
