/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {GetPages, GetPagesCount} from "../helpers/pagination-helper";

export function PaginationLinks({paginationProps}: any) {
    const {totalSize, sizePerPage, page, paginationSize} = paginationProps;
    const pagesCount = GetPagesCount(totalSize, sizePerPage);
    const pages = GetPages(page, pagesCount, paginationSize);
    const handleFirstPage = ({onPageChange}: any) => {
        onPageChange(1);
    };

    const handlePrevPage = ({page, onPageChange}: any) => {
        onPageChange(page - 1);
    };

    const handleNextPage = ({page, onPageChange}: any) => {
        if (page < pagesCount) {
            onPageChange(page + 1);
        }
    };

    const handleLastPage = ({onPageChange}: any) => {
        onPageChange(pagesCount);
    };

    const handleSelectedPage = ({onPageChange}: any, pageNum: any) => {
        onPageChange(pageNum);
    };

    const disabledClass = pagesCount > 1 ? "" : "disabled";
    return (
        <>
            {pagesCount < 2 && (<div className={`d-flex flex-wrap mr-3 ${disabledClass}`}/>)}
            {pagesCount > 1 && (
                <>
                    <div className={`d-flex flex-wrap mr-3 ${disabledClass}`}>
                        <a
                            onClick={() => handleFirstPage(paginationProps)}
                            className={`btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1 ${paginationProps.page < 2 ? "disabled" : ""}`}
                        >
                            <i className="ki ki-bold-double-arrow-back icon-xs"/>
                        </a>
                        <a
                            onClick={() => handlePrevPage(paginationProps)}
                            className={`btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1 ${paginationProps.page < 2 ? "disabled" : ""}`}
                        >
                            <i className="ki ki-bold-arrow-back icon-xs"/>
                        </a>

                        {page > 1 && (
                            <a className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">
                                ...
                            </a>
                        )}
                        {pages.map((p) => (
                            <a
                                key={p}
                                onClick={() => handleSelectedPage(paginationProps, p)}
                                className={`btn btn-icon btn-sm border-0 btn-light ${
                                    page === p ? " btn-hover-primary active" : ""
                                } mr-2 my-1`}
                            >
                                {p}
                            </a>
                        ))}
                        {page < pagesCount && (
                            <a className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">
                                ...
                            </a>
                        )}
                        <a
                            onClick={() => handleNextPage(paginationProps)}
                            className={`btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1 ${paginationProps.page >= pagesCount ? "disabled" : ""}`}
                        >
                            <i className="ki ki-bold-arrow-next icon-xs"/>
                        </a>
                        <a
                            onClick={() => handleLastPage(paginationProps)}
                            className={`btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1 ${paginationProps.page >= pagesCount ? "disabled" : ""}`}
                        >
                            <i className="ki ki-bold-double-arrow-next icon-xs"/>
                        </a>
                    </div>
                </>
            )}
        </>
    );
}
