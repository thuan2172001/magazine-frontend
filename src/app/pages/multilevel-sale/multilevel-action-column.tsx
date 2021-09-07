// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
// import './master-table.scss';
import {IntlShape} from 'react-intl';
import {ToAbsoluteUrl} from '../../common-library/helpers/assets-helpers';

interface ActionColumnProps<T> {
  onDelete: (entity: T) => void;
}

export function MultilevelSaleActionColumn<T>(
  cellContent: any,
  row: any,
  rowIndex: number,
  {onDelete, intl}: ActionColumnProps<T> & { intl: IntlShape },
) {
  
  return (
    <>
      <a
        // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.DELETE_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => onDelete(row)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={ToAbsoluteUrl('/media/svg/icons/General/Trash.svg')}
            title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.DELETE_BTN'})}
          />
        </span>
      </a>
    </>
  );
}
