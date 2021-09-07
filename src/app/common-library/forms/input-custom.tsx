import React, {ReactElement} from 'react';
import {useFormikContext} from "formik";

export function InputCustom({
                              className, component, ...props
                            }: {
  className: string,
  component: (props: any) => ReactElement;
  
}) {
  const Component = component;
  const formik = useFormikContext<any>();
  return (<div className={className}>
    <Component  {...formik} {...props}/>
  </div>)
}

