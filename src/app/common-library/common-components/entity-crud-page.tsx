import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {Form, Formik} from 'formik';
import {Link, useHistory} from 'react-router-dom';
import {Card, CardBody, CardHeader} from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {ModifyForm} from '../common-types/common-type';
import _ from 'lodash';
import {ModifyEntityPage} from './modify-entity-page';
import {GetHomePage, InitValues} from "../helpers/common-function";
import {Spinner} from "react-bootstrap";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import PostComments from "../../pages/post/post-comments";
import {AxiosResponse} from "axios";

function EntityCrudPage({
                          entity,
                          onModify,
                          moduleName = 'COMMON_COMPONENT.CREATE_UPDATE.MODULE_NAME',
                          code,
                          get,
                          formModel,
                          actions,
                          validation,
                          loading,
                          mode,
                          setEditEntity,
                          homePageUrl,
                            allFormButton,
                            onComments,
                            showComment = true
                        }: {
  // modifyModel: ModifyModel;
  moduleName?: string;
  entity?: any;
  onModify: (values: any) => Promise<any>;
  code?: string;
  get?: (code: string) => any;
  formModel: ModifyForm;
  mode?: 'horizontal' | 'vertical';
  actions?: any;
  validation?: any;
  autoFill?: any;
  loading?: boolean;
  setEditEntity?: (entity: any) => void;
  homePageUrl?: string
    allFormButton?: any;
    onComments?: (entity: any, data: { content: string }) => Promise<AxiosResponse<any>>;
    showComment?: boolean;
}) {
  const intl = useIntl();
  const history = useHistory();
  const initValues = useMemo(() => InitValues(formModel), [formModel]);

  const [entityForEdit, setEntityForEdit] = useState(entity);
  useEffect(()=>{
    entity && setEntityForEdit(entity);
  }, [entity])

  useEffect(() => {
    if (!code && !entity) setEntityForEdit(initValues);
  }, [initValues, code]);
  const {_header, ...modifyPanels} = formModel;
  
  useEffect(() => {
    if (code) {
      get &&
      get(code).then((res: { data: any }) => {
        setEntityForEdit({...res.data});
        if (setEditEntity) { setEditEntity(res.data) }
      });
    }
  }, [code]);

  console.log(entityForEdit)
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit}
        validationSchema={validation}
        onSubmit={(values, {setSubmitting, validateForm}) => {
          console.log(values)
          onModify(values).then(() => {
            history.push(homePageUrl ?? GetHomePage(window.location.pathname))
          }).catch((err) => {
            // setSubmitting(false);
          });
        }}>
        {({handleSubmit, setFieldValue}) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(modifyPanels).map((key, index, keys) => {
                const val = modifyPanels[key];
                if (_.isString(val))
                  throw new Error('Sử dụng sai cách ' + key + '\n' + JSON.stringify(modifyPanels));
                const {_title, ...panel} = val;
                return (
                  <Card key={`entity-crud-card` + key} className={'modify-page'}>
                    <CardHeader
                      className={'border-bottom-0'}
                      title={
                        index == 0 ? (
                          <a
                            onClick={() => history.goBack()}
                            className={'cursor-pointer text-primary font-weight-boldest'}>
                            <ArrowBackIosIcon/>
                            {_.isString(_header) ? intl
                              .formatMessage(
                                {id: _header},
                                {moduleName: intl.formatMessage({id: moduleName ?? 'EMPTY'})},
                              )
                              .toUpperCase() : _header(entityForEdit)}
                          </a>
                        ) : (
                          <>
                            {intl
                              .formatMessage(
                                {id: _title},
                                {moduleName: intl.formatMessage({id: moduleName ?? 'EMPTY'})},
                              )
                              .toUpperCase()}
                          </>
                        )
                      }
                    />
                    <CardBody>
                      <ModifyEntityPage
                        mode={mode}
                        // className={formPart[key].className}
                        // images={images}
                        inputGroups={panel}
                      />
                    {allFormButton && allFormButton.type === 'outside' && (
                        <div className="text-right mt-10">
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
                                                    allFormButton['data'][keyss].onClick(entityForEdit);
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
                                                    allFormButton['data'][keyss].onClick(entityForEdit);
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
                      {(actions && index === Object.keys(modifyPanels).length - 1) && (
                        <div className="text-right mt-10" key={key}>
                          {Object.keys(actions.data).map(keyss => {
                            switch (actions.data[keyss].role) {
                              case 'submit':
                                return (
                                  <button
                                    className={actions.data[keyss].className}
                                    key={keyss}
                                    type={'submit'}
                                  >
                                    {loading === true ? actions.data[keyss].loading ?? (
                                      <Spinner animation="border" variant="light"
                                               size="sm"/>) : actions.data[keyss].icon} {intl.formatMessage({id: actions.data[keyss].label})}
                                  </button>
                                );
                              
                              case 'button':
                                return (
                                  <button
                                    type={actions.data[keyss].type}
                                    className={actions.data[keyss].className}
                                    key={keyss}>
                                    {actions.data[keyss].icon} {intl.formatMessage({id: actions.data[keyss].label})}
                                  </button>
                                );
                              case 'link-button':
                                return (
                                  <Link to={actions.data[keyss].linkto} key={keyss}>
                                    <button
                                      type={actions.data[keyss].type}
                                      className={actions.data[keyss].className}>
                                      {actions.data[keyss].icon} {intl.formatMessage({id: actions.data[keyss].label})}
                                    </button>
                                  </Link>
                                );
                            }
                          })}
                        </div>)
                      }
                    </CardBody>
                  </Card>
                );
              })}

            </Form>
              {showComment !== true || !onComments ? <></> : (entityForEdit?.confirmationStatus === '3'
                  || (entityForEdit?.isMaster === true && entityForEdit?.confirmationStatus === '2')) ? (
                  <Card>
                      <CardBody className={'p-0'}>
                          <div className="mb-5 mt-5">
                              <span className="text-primary detail-dialog-subtitle mt-8">BÌNH LUẬN</span>
                              <div className="mt-8 border border-light rounded pt-5 pb-5">
                                  {entityForEdit && entityForEdit.comments.length > 0 ? (
                                      entityForEdit.comments.map(
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
                  <PostComments entity={entityForEdit} onComments={onComments} />
              )}
          </>
        )}
      </Formik>
    </>
  );
}

export default EntityCrudPage;
