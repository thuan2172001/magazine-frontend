import React, {ReactElement, useCallback, useMemo} from 'react';
import ImageUploading from 'react-images-uploading';
import {GetClassName, getNewImage} from '../helpers/common-function';
import exifr from 'exifr';
import './custom-image-upload.scss';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {DetailImage} from "../common-components/detail/detail-image";
import _ from "lodash";
import {useIntl} from "react-intl";
import {DisplayError} from "./field-feedback-label";

interface ImageUploadPros {
  value: any[];
  label: string | ReactElement;
  onChange?: any;
  labelWidth?: number;
  isArray?: boolean;
  required?: boolean | ((values: any) => boolean);
  name: string;
  maxNumber?: number;
  pathField?: string;
  thumbnailField?: string;
  width?: number | string;
  height?: number | string;
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical' | undefined;
}

function CustomImageUpload({
                             label,
                             labelWidth,
                             pathField = 'path',
                             thumbnailField = 'thumbnail',
                             required,
                             disabled,
                             name,
                             mode,
                             isArray = true,
                             maxNumber = 3,
                             width = 127,
                             height = 109,
                           }: ImageUploadPros) {
  const {errors, touched, setFieldValue, values, setFieldTouched} = useFormikContext<any>();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'RADIO.ERROR.REQUIRED';
  }, []);
  const [field, fieldMeta, fieldHelper] = useField({validate, name});
  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  const _disabled = useMemo(() => {
    return disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled;
  }, [disabled, values]);
  
  const handleChange = useCallback((imageList: any[], addUpdateIndex: any, key: string) => {
    const newArr = getNewImage(isArray ? field.value : [field.value], imageList);
    const promise = getImageMetaList(newArr, key);
    promise.then((metadataList) => {
      const arr = imageList.map((image: any, index) => {
        let result = {[pathField]: image[pathField]};
        if (metadataList[index]) {
          result.location = {
            type: 'Point',
            coordinates: [metadataList[index].lat, metadataList[index].long],
          };
          result.takenTime = metadataList[index].time
        }
        return result;
      });

      if (isArray) setFieldValue(name, arr);
      else {
        setFieldValue(name, arr[0]);
      }
      setFieldTouched(name, true);
    });
  }, [field.value]);

  const innerValue = useMemo(()=>{
    return field.value ? isArray ? field.value : [field.value] : []
  }, [field.value, isArray]);

  const onChange = useCallback((imageList: any, addUpdateIndex: any) => {
    console.log(imageList);
    handleChange(imageList, addUpdateIndex, name);
  }, [handleChange,name]);
  return (
    <div className={mode === 'horizontal' ? 'row' : ''}>
      {_label && (
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
            {_label}{required && <span className="text-danger">*</span>}
          </label>
        </div>
      )}
      <div className={GetClassName(labelWidth, false)}>
        <ImageUploading
          multiple={maxNumber > 1}
          value={innerValue}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey={pathField}>
          {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => {
            // console.log(imageList);
            return (
              // write your building UI
              <>
                <div
                  className={
                    errors[name] && touched[name]
                      ? 'is-invalid d-flex flex-wrap upload__image-wrapper'
                      : 'd-flex flex-wrap upload__image-wrapper'
                  }>
                  <DetailImage onImageRemove={onImageRemove} images={imageList} width={width} height={height}/>
                  {!_disabled && !(imageList.length >= maxNumber) && (
                    <button
                      type="button"
                      style={_.merge(isDragging ? {color: 'red'} : undefined, {width: width, height: height})}
                      onClick={onImageUpload}
                      className="button-add-image text-primary"
                      {...dragProps}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 25 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.5 2.5H18.75V11.25H21.25V2.5C21.25 1.12125 20.1287 0 18.75 0H2.5C1.12125 0 0 1.12125 0 2.5V17.5C0 18.8787 1.12125 20 2.5 20H12.5V17.5H2.5V2.5Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.5 10L3.75 15H17.5L12.5 7.5L8.75 12.5L7.5 10Z"
                          fill="currentColor"
                        />
                        <path
                          d="M21.25 13.75H18.75V17.5H15V20H18.75V23.75H21.25V20H25V17.5H21.25V13.75Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {(<ErrorMessage name={field.name}>
                  {msg => <DisplayError label={_label} error={msg}/>
                  }
                </ErrorMessage>)}
              </>
            )
          }}
        </ImageUploading>
      </div>
    </div>
  );
}

const getImageMetaList = (file: any, key: string): Promise<any[]> => {
  if (!file) return Promise.resolve([]);
  return Promise.all(file.map((item: any) => {
    return exifr.parse(item.file).catch(error => {
      console.log(error);
      return {}
    })
  }));
}


export default CustomImageUpload;
