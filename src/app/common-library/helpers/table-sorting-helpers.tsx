/* Pagination Helprs */
import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons'

export const SortCaret = (order: any, column: any) => {
  if (!order) return (
    <span style={{marginLeft:3}}><FontAwesomeIcon icon={faSort}/></span>
  );
  else if (order === "asc")
    return (
      <span style={{marginLeft:3}}><FontAwesomeIcon icon={faSortDown}/></span>
    );
  else if (order === "desc")
    return (
      <span style={{marginLeft:3}}><FontAwesomeIcon icon={faSortUp}/></span>
    );
  return null;
};

export const HeaderSortingClasses = (column: any, sortOrder: any, isLastSorting: any, colIndex: any) => (
  (sortOrder === 'asc' || sortOrder === "desc") ? 'sortable-active' : ''
);
