import React, {ReactElement} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import _ from "lodash";

interface FeedBackProps {
  label: string | ReactElement;
  touched: any;
  error?: any;
  customFeedbackLabel: string;
  type?: string;
}

export const DisplayError = ({label, error}: {
  label: string | ReactElement; error: string;
  
}) => {
  const intl = useIntl();
  if (error) {
    return (
      <div className="invalid-feedback">
        {intl.formatMessage({id: error}, {label: _.isString(label) ? label : ''})}
        {!_.isString(label) && label}
        {/* {error} */}
      </div>
    );
  }
  return <></>;
};

export function FieldFeedbackLabel({
                                     label,
                                     touched,
                                     error,
                                     type,
                                     customFeedbackLabel,
                                   }: FeedBackProps) {
  // return <InputLabel label={label} touched={touched} error={error} customFeedbackLabel={customFeedbackLabel}/>;
  return <></>;
}
