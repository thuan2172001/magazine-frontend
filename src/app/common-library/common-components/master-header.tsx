import React from 'react';
import {useIntl} from 'react-intl';
import {Formik} from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import {Card, CardBody, CardHeader} from '../card';
import SVG from 'react-inlinesvg';
import {ToAbsoluteUrl} from '../helpers/assets-helpers';
import {SearchModel} from '../common-types/common-type';
// import InfiniteScroll from 'react-infinite-scroll-component';
import {iconStyle} from '../common-consts/const';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './master-header.css';
import {
  InputDateTime,
  InputNumber,
  InputSearchSelect,
  InputString,
  InputStringNumber,
  InputTreeSelect
} from "./common-input";

export function MasterHeader<T>({
                                  title,
                                  onSearch,
                                  searchModel,
                                  initValue = {},
                                  value,
                                  onClickBack
                                }: {
  searchModel: SearchModel;
  title: string;
  initValue?: any;
  value?: any;
  onSearch?: (data: any) => void;
  onClickBack?: () => void;
}) {
  const intl = useIntl();
  const defaultClassName = "col-xxl-2 col-md-3 master-header-search-input-margin";
  const handleResetForm = (resetForm: any) => {
    resetForm();
  };
  return (
    <Card className={'master-header-card'}>
      <CardHeader title={onClickBack ? <span
                            onClick={onClickBack}
                            className={'cursor-pointer text-primary font-weight-boldest'}>
                            <ArrowBackIosIcon/>
                            {intl.formatMessage({id: title}).toUpperCase()}
                          </span> : intl.formatMessage({id: title}).toUpperCase()}/>
      <CardBody>
        <Formik
          initialValues={initValue}
          onSubmit={values => {
            onSearch && onSearch({...values});
          }}
          onReset={data => {
            onSearch && onSearch({});
            // if (onReset) {
            //   onReset(data);
            // }
          }}
        >
          {({values, handleSubmit, handleBlur, handleChange, setFieldValue, resetForm}) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row master-header-search-margin">
                {searchModel ? (
                  Object.keys(searchModel).map(key => {
                    // console.log(values)
                    switch (searchModel[key].type) {
                      case 'string': {
                        return (
                          <InputString
                            className={defaultClassName}
                            name={key}
                            {...searchModel[key]}
                            key={`master_header${key}`}/>
                        );
                      }
                      case 'string-number': {
                        return (
                          <InputStringNumber
                            className={defaultClassName}
                            name={key}
                            {...searchModel[key]}
                            key={`master_header${key}`}/>
                        );
                      }
                      case 'number': {
                        return (
                          <InputNumber
                            className={defaultClassName}
                            name={key}
                            {...searchModel[key]}
                            key={`master_header${key}`}/>
                        );
                      }
                      case 'date-time': {
                        return (
                          <InputDateTime
                            className={defaultClassName}
                            name={key}
                            {...searchModel[key]}
                            key={`master_header${key}`}
                          />
                        );
                      }
                      case 'search-select': {
                        if (searchModel[key].onSearch === undefined || searchModel[key].onSearch === null) return;
                        const t: any = (t: any) => null;
                        return (
                          <InputSearchSelect
                            className={defaultClassName}
                            name={key}
                            value={values[key]}
                            {...searchModel[key]}
                            onSearch={searchModel[key].onSearch ?? t}
                            key={`master_header${key}`}
                          />
                        );
                      }
                      case 'tree-select': {
                        if (searchModel[key].onSearch === undefined || searchModel[key].onSearch === null) return;
                        const t: any = (t: any) => null;
                        return (
                          <InputTreeSelect
                            className={defaultClassName}
                            name={key}
                            {...searchModel[key]}
                            onSearch={searchModel[key].onSearch ?? t}
                            key={`master_header${key}`}
                          />
                        );
                      }
                    }
                    return <></>;
                  })
                ) : (
                  <></>
                )}
              </div>
  
              {onSearch && (<div className="row no-gutters">
                <button className="btn btn-primary mr-8 fixed-btn-width" type="submit">
                  <SearchIcon style={iconStyle}/>
                  {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_HEADER.SEARCH_BTN'})}
                </button>
                <button
                  className="btn btn-outline-primary fixed-btn-width"
                  type="reset"
                  onClick={() => handleResetForm(resetForm)}>
                  <SVG src={ToAbsoluteUrl('/media/svg/vncheck/reset-filter.svg')}
                       style={iconStyle}/>
                  {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_HEADER.RESET_FILTER_BTN'})}
                </button>
              </div>)}
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
