import {useHtmlClassService} from "../_core/metronic-layout";
import React, {useMemo} from "react";
import objectPath from "object-path";
import {HeaderMobile} from "./header-mobile/header-mobile";
import {Aside} from "./aside/aside";
import {Header} from "./header/header";
import {QuickUser} from "./extras/offcanvas/quick-user";
import {QuickPanel} from "./extras/offcanvas/quick-panel";
import {ScrollTop} from "./extras/scroll-top";
import {StickyToolbar} from "./extras/sticky-toolbar";
import {LayoutInit} from "./layout-init";

export const Layout = ({children}: any) => {
    const uiService: any = useHtmlClassService();
    // Layout settings (cssClasses/cssAttributes)
    const layoutProps = useMemo(() => {
        return {
            layoutConfig: uiService.config,
            selfLayout: objectPath.get(uiService.config, 'self.layout'),
            asideDisplay: objectPath.get(uiService.config, 'aside.self.display'),
            subheaderDisplay: objectPath.get(uiService.config, 'subheader.display'),
            desktopHeaderDisplay: objectPath.get(uiService.config, 'header.self.fixed.desktop'),
            contentCssClasses: uiService.getClasses('content', true),
            contentContainerClasses: uiService.getClasses('content_container', true),
            contentExtended: objectPath.get(uiService.config, 'content.extended'),
        };
    }, [uiService]);

    return layoutProps.selfLayout !== 'blank' ? (
        <>
            {/*begin::Main*/}
            <HeaderMobile/>
            <div className="d-flex flex-column flex-root">
                {/*begin::Page*/}
                <div className="d-flex flex-row flex-column-fluid page">
                    {layoutProps.asideDisplay && <Aside/>}
                    {/*begin::Wrapper*/}
                    <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                        <Header/>
                        {/*begin::Content*/}
                        <div
                            id="kt_content"
                            className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}>
                            {/* {layoutProps.subheaderDisplay && <SubHeader />} */}
                            {/*begin::Entry*/}
                            {!layoutProps.contentExtended && (
                                <div className="d-flex flex-column-fluid">
                                    {/*begin::Container*/}
                                    <div className={layoutProps.contentContainerClasses}>{children}</div>
                                    {/*end::Container*/}
                                </div>
                            )}

                            {layoutProps.contentExtended && {children}}
                            {/*end::Entry*/}
                        </div>
                        {/*end::Content*/}
                        {/* <Footer/> */}
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Page*/}
            </div>
            <QuickUser/>
            <QuickPanel/>
            <ScrollTop/>
            {/*end::Main*/}
            <LayoutInit/>
        </>) : (<div className="d-flex flex-column flex-root">{children}</div>)
};