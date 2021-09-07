import React from 'react';
import {Card, CardBody} from '../../common-library/card';
import BasicUnitTable from './basic-unit-table/basic-unit-table';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {useIntl} from 'react-intl';
import {BasicUnitDataProps} from './_interface/basic-unit.interface';
import {iconStyle} from "../../common-library/common-consts/const";

function BasicUnitCard({
                         showModal,
                         hideModal,
                         show,
                         basicUnitArray,
                         total,
                         loading,
                         queryParams,
                         setQueryParamsBase,
                         ids,
                         setIds,
                         setQueryParams,
                       }: BasicUnitDataProps) {
  const intl = useIntl();
  
  return (
    <Card>
      <CardBody>
        <div className="row no-gutters mb-10">
          <div className="col-xxl-1 col-xl-2 col-lg-2 col-5 mr-5 text-center">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => showModal(null, 'edit')}>
              + {intl.formatMessage({id: 'BASIC_UNIT.CARD.HEADER.BUTTON.ADD'})}
            </button>
          </div>
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-md-0 mr-5 col-5">
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              onClick={() => showModal(null, 'deleteMany')}>
              <DeleteOutlineOutlinedIcon style={iconStyle}/>{' '}
              {intl.formatMessage({id: 'BASIC_UNIT.CARD.HEADER.BUTTON.DELETE'})}
            </button>
          </div>
        </div>
        {basicUnitArray.length > 0 ? (
          <BasicUnitTable
            showModal={showModal}
            hideModal={hideModal}
            show={show}
            basicUnitArray={basicUnitArray}
            total={total}
            loading={loading}
            queryParams={queryParams}
            setQueryParamsBase={setQueryParamsBase}
            ids={ids}
            setIds={setIds}
            setQueryParams={setQueryParams}
          />
        ) : (
          <h3 className="text-center">Không có dữ liệu</h3>
        )}
      </CardBody>
    </Card>
  );
}

export default BasicUnitCard;
