import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { getFieldV3 } from '../../common-library/common-components/master-detail-page';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import { RenderInfoDetail } from '../../common-library/common-types/common-type';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { AxiosResponse } from 'axios';
import PostComments from './post-comments';

export function PostDetail({
  header,
  moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
  entity,
  onClose,
  renderInfo,
  homeURL,
  code,
  get,
  allFormButton,
  onComments,
  setDetailEntity,
  showComment = true
}: {
  header?: string;
  moduleName?: string;
  entity?: any;
  renderInfo: RenderInfoDetail;
  onClose?: () => void;
  homeURL?: string;
  code?: string;
  get?: (code: string) => any;
  allFormButton?: any;
  onComments?: (entity: any, data: { content: string }) => Promise<AxiosResponse<any>>;
  setDetailEntity?: (entity: any) => void;
  showComment?: boolean;
}) {
  const intl = useIntl();

  const [entityDetail, setEntityDetail] = useState(entity);

  const history = useHistory();

  useEffect(() => {
    setEntityDetail(entity)
  }, [entity])

  useEffect(() => {
    if (code && get) {
      get(code).then((res: { data: any }) => {
        setEntityDetail(res.data);
       
        if (setDetailEntity) {
          setDetailEntity(res.data);
        }
      });
    }
  }, [code]);
  console.log(entityDetail)
  return (
    <>
      {renderInfo.map((value, index) => (
        <React.Fragment key={index}>
          <Card>
            {index === 0 && header && (
              <CardHeader
                className={'border-bottom-0 pl-0 large-font-size'}
                title={
                  <a
                    onClick={() => history.goBack()}
                    className={'cursor-pointer text-primary font-weight-boldest'}>
                    <ArrowBackIosIcon />
                    {intl
                      .formatMessage(
                        { id: header },
                        { moduleName: intl.formatMessage({ id: moduleName }) },
                      )
                      .toUpperCase()}
                  </a>
                }
              />
            )}
            <CardBody className={'p-0'}>
              <div className={`row mt-5`}>
                <div
                  key={index}
                  className={`${value.className ?? 'col-md-6 col-12 border-bottom pb-10'}`}>
                  {value.header && value.header !== '' && (
                    <p className="text-primary detail-dialog-subtitle">
                      {intl.formatMessage({ id: value.header })}
                    </p>
                  )}
                  <div className={'row no-gutters'}>
                    {Object.keys(value.data).map(dataKey => (
                      <>
                        {value.data[dataKey].title && value.data[dataKey].title !== '' && (
                          <div className={`${value.titleClassName ?? 'col-4 mb-10'}`}>
                            {intl.formatMessage({ id: value.data[dataKey].title })}{value.data[dataKey].title !== 'EMPTY' ? ':' : ''}
                          </div>
                        )}
                        <div className={`${value.dataClassName ?? 'col-8 mb-10'}`}>
                          {entityDetail &&
                            (() => {
                              const displayInfo = value.data[dataKey];
                              const fieldName = displayInfo.keyField ?? dataKey;
                              const displayData =
                                fieldName.indexOf('[') > -1
                                  ? getFieldV3(entityDetail, fieldName)
                                  : getFieldV3(entityDetail, fieldName)[0];
                              console.log(entityDetail);
                              console.log(fieldName);
                              console.log(displayData);
                              return displayInfo.formatter ? (
                                displayInfo.formatter(displayData, entityDetail)
                              ) : (
                                <>
                                  {_.isNumber(displayData) || _.isString(displayData)
                                    ? displayData
                                    : JSON.stringify(displayData)}
                                </>
                              );
                            })()}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </React.Fragment>
      ))}
      {showComment !== true ? <></> : (entityDetail?.confirmationStatus === '3' || (entityDetail?.isMaster === true && entityDetail?.confirmationStatus === '2')) ? (
        <Card>
          <CardBody className={'p-0'}>
            <div className="mb-5 mt-5">
              <span className="text-primary detail-dialog-subtitle mt-8">BÌNH LUẬN</span>
              <div className="mt-8 border border-light rounded pt-5 pb-5">
                {entityDetail && entityDetail.comments.length > 0 ? (
                  entityDetail.comments.map(
                    (
                      value: { createdBy: { _id: string; fullName: string }; content: string },
                      key: number,
                    ) => (
                      <div key={key} className="row mb-3">
                        <div className="col-1 text-center">
                          <AccountCircleOutlinedIcon style={{ fontSize: 30 }} />
                        </div>
                        <div className="col-10 bg-light rounded p-3">
                          <p className="font-bold">{value.createdBy.fullName}</p>
                          <p>{value.content}</p>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <span>Chưa có bình luận</span>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <PostComments entity={entityDetail} onComments={onComments} />
      )}
      {allFormButton && allFormButton.type === 'outside' && (
        <div className="text-right mb-5 mr-20">
          {Object.keys(allFormButton.data).map(keyss => {
            switch (allFormButton['data'][keyss].role) {
              case 'submit':
                return (
                  <button
                    type={allFormButton['data'][keyss].type}
                    onClick={() => {
                      // handleSubmit();
                      allFormButton['data'][keyss].onClick();
                    }}
                    className={allFormButton['data'][keyss].className}
                    key={keyss}>
                    {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                  </button>
                );

              case 'special':
                return (
                  <button
                    type={allFormButton['data'][keyss].type}
                    onClick={() => {
                      // handleSubmit();
                      allFormButton['data'][keyss].onClick(entityDetail);
                    }}
                    className={allFormButton['data'][keyss].className}
                    key={keyss}>
                    {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                  </button>
                );

              case 'button':
                return (
                  <button
                    type={allFormButton['data'][keyss].type}
                    className={allFormButton['data'][keyss].className}
                    key={keyss}
                    onClick={() => {
                      allFormButton['data'][keyss].onClick(entityDetail);
                    }}>
                    {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                  </button>
                );
              case 'link-button':
                return (
                  <Link to={allFormButton['data'][keyss].linkto} key={keyss}>
                    <button
                      type={allFormButton['data'][keyss].type}
                      className={allFormButton['data'][keyss].className}>
                      {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                    </button>
                  </Link>
                );
            }
          })}
        </div>
      )}
    </>
  );
}
