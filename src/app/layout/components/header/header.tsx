import React, {useEffect, useMemo, useState} from "react";
import objectPath from "object-path";
import {Topbar} from "./topbar";
import {AnimateLoading} from "../../../../_metronic/_partials/controls";
import {useHtmlClassService} from "../../_core/metronic-layout";
import {HeaderMenuWrapper} from "./header-menu/header-menu-wrapper";
import * as AcademicYearService from "../../../pages/academic-year/academic-year.service";
import {FormattedDate, FormattedMessage} from "react-intl";

export function Header() {
    const uiService: any = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            headerClasses: uiService.getClasses("header", true),
            headerAttributes: uiService.getAttributes("header"),
            headerContainerClasses: uiService.getClasses("header_container", true),
            menuHeaderDisplay: objectPath.get(
                uiService.config,
                "header.menu.self.display"
            )
        };
    }, [uiService]);
    const [activeAcademicYear, setActiveAcademicYear] = useState<any>();
    useEffect(()=> {
        AcademicYearService.GetAll({status:'Active'} as any).then(data => {
            console.log(data.data.data[0])
            setActiveAcademicYear(data.data.data[0]);
        })
    }, [])

    return (
        <>
            {/*begin::Header*/}
            <div
                className={`header ${layoutProps.headerClasses} ml-3 mr-3`}
                id="kt_header"
                {...layoutProps.headerAttributes}
            >
                {/*begin::Container*/}
                <div
                    className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between`}>
                    <AnimateLoading/>
                    {/*begin::Header Menu Wrapper*/}
                    {
                        <span className="text-primary text-uppercase
                        font-weight-bold font-size-lg ml-auto mr-auto d-inline-flex align-items-center">
                            {activeAcademicYear ? (<span>No Academic Year is active right now!</span>) :
                              (<><span><FormattedMessage id={'ACADEMIC_YEAR.HEADER.START_DATE'}/> : <FormattedDate
                                  value={activeAcademicYear?.startDate}/>&nbsp;</span>
                                <span>-&nbsp;<FormattedMessage id={'ACADEMIC_YEAR.HEADER.FINAL_CLOSURE_DATE'}/> : {
                                    <FormattedDate value={activeAcademicYear?.finalClosureDate}/>}</span></>)
                            }
                        </span>

                    }
                    {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper/>}
                    {!layoutProps.menuHeaderDisplay && <div/>}
                    {/*end::Header Menu Wrapper*/}

                    {/*begin::Topbar*/}
                    <Topbar/>
                    {/*end::Topbar*/}
                </div>
                {/*end::Container*/}
            </div>
            {/*end::Header*/}
        </>
    );
}
