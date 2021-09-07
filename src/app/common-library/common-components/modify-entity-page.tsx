import React, {Fragment} from 'react';
import {InputGroups} from '../common-types/common-type';
import {useIntl} from 'react-intl';
import {
  InputBoolean,
  InputCheckBox,
  InputDateTime,
  InputImage,
    InputFile,
  InputNumber,
  InputRadio,
  InputSearchSelect,
  InputSelect,
  InputString,
  InputStringNumber,
  InputTag,
  InputTreeSelect,
} from './common-input';
import _ from 'lodash';
import {InputCustom} from "../forms/input-custom";

export function ModifyEntityPage<T>({
                                      inputGroups,
                                      mode = 'horizontal',
                                    }:
                                      {
                                        inputGroups: InputGroups;
                                        mode?: 'horizontal' | 'vertical';
                                        errors?: any;
                                      }) {
  const intl = useIntl();
  const {_subTitle, ...pl} = inputGroups;
  return (
    <>
      <div className={'row'}>
        {pl && Object.values(pl).map((inputGroup, index) => {
          if (_.isString(inputGroup)) throw new Error('Sử dụng sai cách ' + inputGroup + '\n' + JSON.stringify(pl));
          const {_subTitle, _className, _inputClassName, ...inputs} = inputGroup;
          return (
            <div key={`modify-entity-page${index}`} className={_className ?? 'col-12'}>
              {_subTitle && _subTitle !== '' && (<div
                className="modify-subtitle text-primary">{intl.formatMessage({id: _subTitle}).toUpperCase()}</div>)}
              <RenderForm inputs={inputs} prevKey={''} inputClassName={_inputClassName} mode={mode}/>
            </div>
          )
        })}
      </div>
    </>
  );
}

export const RenderForm = ({inputs, prevKey, mode, inputClassName}: any) => {
  const intl = useIntl();
  const defaultClassName = inputClassName ?? 'mb-5';
  return (<>
    {Object.keys(inputs).map(key => {
      const input = inputs[key];
      const trimKey = key.trim();
      if (_.isString(input)) throw new Error('Sử dụng sai cách ' + key + '\n' + JSON.stringify(inputs));
      const name = prevKey ? ((trimKey === '' || prevKey === '') ? prevKey : `${prevKey}.${trimKey}`) : trimKey;
      switch (input._type) {
        case 'string':
        case 'email':
          return (
            <InputString
              className={defaultClassName}
              name={name}
              type={input._type}
              {...input}
              mode={mode}
              key={`modify-page-form-${name}`}/>
          );
        case 'string-number': {
          return (
            <InputStringNumber
              className={defaultClassName}
              name={name}
              type={input._type}
              {...input}
              mode={mode}
              key={`modify-page-form-${name}`}/>
          );
        }
        case 'number':
          return (
            <InputNumber
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}/>
          );
        case 'date-time':
          return (
            <InputDateTime
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}/>
          );
        case 'radio':
          return (
            <InputRadio
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}/>
          )
        case 'boolean': {
          return (
            <InputBoolean
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        }
        case 'image':
          return (
            <InputImage
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              // value={(values && values[key]) || []}
              key={`modify-page-form-${name}`}
            />
          );
      case 'file':
          return (
              <InputFile
                  className={defaultClassName}
                  name={name}
                  mode={mode}
                  type={input._type}
                  {...input}
                  // value={(values && values[key]) || []}
                  key={`modify-page-form-${name}`}
              />
          );
        case 'search-select': {
          return (
            <InputSearchSelect
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        }
        case 'tree-select': {
          return (
            <InputTreeSelect
              className={defaultClassName}
              name={key}
              mode={mode}
              type={input._type}
              {...input}
              key={`master_header${key}`}
            />
          );
        }
        case 'tag': {
          return (
            <InputTag
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        }
        
        case 'checkbox':
          return (
            <InputCheckBox
              className={defaultClassName}
              name={name}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        
        case 'select':
          return (
            <InputSelect
              className={defaultClassName}
              name={name}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          )
        
        case 'custom': {
          const {_type, ...props} = input;
          return (<InputCustom {...props} key={`modify-page-form-${name}`}/>);
        }
        default: {
          const {_type, _subTitle, _className, _inputClassName, ...innt} = input as any;
          return _className ? (
              <span key={`render_form_span${name}`} className={_className}>
            {_subTitle && _subTitle !== '' && (<div
              className="modify-subtitle text-primary">{intl.formatMessage({id: _subTitle}).toUpperCase()}</div>)}
                <RenderForm inputs={innt} inputClassName={_inputClassName ?? inputClassName}
                            prevKey={name}
                            mode={mode}/>
            </span>) :
            (<Fragment key={`render_form${name}`}>
              {_subTitle && _subTitle !== '' && (<div
                className="modify-subtitle text-primary">{intl.formatMessage({id: _subTitle}).toUpperCase()}</div>)}
              <RenderForm inputs={innt} inputClassName={_inputClassName ?? inputClassName}
                          prevKey={name}
                          mode={mode}/>
            </Fragment>)
        }
      }
    })}</>)
};
