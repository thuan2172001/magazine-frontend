// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import Visibility from '@material-ui/icons/Visibility';
import './master-table.scss';
import {ToAbsoluteUrl} from '../helpers/assets-helpers';
import {ActionColumnProps} from '../common-types/common-type';
import {IntlShape} from 'react-intl';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import QueueOutlinedIcon from '@material-ui/icons/QueueOutlined';
import HistoryIcon from '@material-ui/icons/History';

export function ActionsColumnFormatter<T>(
  cellContent: any,
  row: any,
  rowIndex: number,
  {onShowDetail, onDelete, onEdit,onLock, onChangeRole, onClone, onGoHistory, intl}: ActionColumnProps<T> & { intl: IntlShape },
) {
  return (
    <div>
      {onLock && (<a
        // to={`/purchase-order/${row.code}`}
        // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
        onClick={(e) => {
          onLock(row);
          e.preventDefault();
        }}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={ToAbsoluteUrl('/media/svg/vncheck/lock.svg')}
            title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.LOCK_BTN'})}
          />
        </span>
      </a>)}
      {onClone &&  (<a
        title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.CLONE_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm visibility mx-1"
        onClick={(e) => {
          onClone(row);
          e.preventDefault();
        }}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <QueueOutlinedIcon className="text-primary eye"/>
          </span>
        </span>
      </a>)}
      {onShowDetail && (<a
        title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.SHOW_DETAIL_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
        onClick={(e) => {
          onShowDetail(row);
          e.preventDefault();
        }}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <Visibility className="text-primary eye"/>
        </span>
      </a>)}
      {onEdit && (<a
        // to={`/purchase-order/${row.code}`}
        // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
        onClick={(e) => {
          onEdit(row);
          e.preventDefault();
        }}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
            title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN'})}
          />
        </span>
      </a>)}
      {onDelete &&  (<a
        // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.DELETE_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
        onClick={(e) => {
          onDelete(row);
          e.preventDefault();
        }}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <DeleteIcon className="text-primary eye"/>
          </span>
        </span>
      </a>)}
      {
        onGoHistory && (
          <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm visibility mx-1"
          onClick={(e) => {
            onGoHistory(row);
            e.preventDefault();
          }}>
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <HistoryIcon className="text-primary eye" />
          </span>
        </a>
        )
      }
    </div>
  );
}

export function TickColumnFormatter<T>(
  cellContent: string | boolean,
  row: any) {
  return (cellContent === "1" || cellContent === "true" || cellContent === true) ? (
    <CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<CheckCircleIcon style={{color: '#C4C4C4'}}/>)
}
