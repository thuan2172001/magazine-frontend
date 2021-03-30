import React, { forwardRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { isFragment } from 'react-is';
import { useIntl } from 'react-intl';
import { getFieldV3 } from './common-components/master-detail-page';
import _ from 'lodash';

export const CardHeaderIcon = forwardRef(({ className }: any, ref: any) => (
  <span ref={ref} className={clsx('card-head-icon', className)} />
));

export const CardHeaderTitle = forwardRef(({ className, ...props }: any, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h3 {...props} ref={ref} className={clsx('card-label', className)} />
));

export const CardHeaderToolbar = forwardRef(({ children, className, ...props }: any, ref) => (
  <div {...props} ref={ref} className={clsx('card-toolbar', className)}>
    {children}
  </div>
));

export const CardHeader = forwardRef(
  (
    { children, icon, title, toolbar, className, sticky = false, labelRef, ...props }: any,
    ref: any,
  ) => {
    const [top, setTop] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
      handleResize();

      function handleResize() {
        setWindowHeight(window.innerWidth);
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    useEffect(() => {
      // Skip if sticky is disabled or on initial render when we don't know about window height.
      if (!sticky || windowHeight === 0) return;

      const headerElement: HTMLElement | null = document.querySelector('.header');
      const subheaderElement: HTMLElement | null = document.querySelector('.subheader');
      const headerMobileElement: HTMLElement | null = document.querySelector('.header-mobile');
      let nextMarginTop = 0;

      // mobile header
      if (headerElement && headerMobileElement && subheaderElement) {
        if (window.getComputedStyle(headerElement).height === '0px') {
          nextMarginTop = headerMobileElement.offsetHeight;
        } else {
          // desktop header
          if (document.body.classList.contains('header-minimize-topbar')) {
            // hardcoded minimized header height
            nextMarginTop = 60;
          } else {
            // normal fixed header
            if (document.body.classList.contains('header-fixed')) {
              nextMarginTop += headerElement.offsetHeight;
            }

            if (document.body.classList.contains('subheader-fixed')) {
              nextMarginTop += subheaderElement.offsetHeight;
            }
          }
        }
      }

      setTop(nextMarginTop);
    }, [sticky, windowHeight]);

    return (
      <div
        ref={ref}
        className={clsx('card-header', className)}
        style={!sticky ? undefined : { top, position: 'sticky', backgroundColor: '#fff' }}>
        {title != null && (
          <div ref={labelRef} className={clsx('card-title')}>
            {icon}

            {/* Wrap string and fragments in CardHeaderTitle */
            typeof title === 'string' || isFragment(title) ? (
              <CardHeaderTitle className={`text-primary ${className}`}>{title}</CardHeaderTitle>
            ) : (
              title
            )}
          </div>
        )}

        {toolbar}
        {children}
      </div>
    );
  },
);

export const CardBody = forwardRef(({ fit, fluid, className, ...props }: any, ref) => (
  <div
    {...props}
    ref={ref}
    className={clsx(
      'card-body',
      {
        'card-body-fit': fit,
        'card-body-fluid': fluid,
      },
      className,
    )}
  />
));

export const CardFooter = forwardRef(({ className, ...props }: any, ref) => (
  <div {...props} ref={ref} className={clsx('card-footer', className)} />
));

export const Card = forwardRef(({ fluidHeight, className, ...props }: any, ref) => (
  <div
    {...props}
    ref={ref}
    className={clsx('card card-custom gutter-b', { 'card-height-fluid': fluidHeight }, className)}
  />
));

// Set display names for debugging.
if (process.env.NODE_ENV !== 'production') {
  Card.displayName = 'Card';

  CardHeader.displayName = 'CardHeader';
  CardHeaderIcon.displayName = 'CardHeaderIcon';
  CardHeaderTitle.displayName = 'CardHeaderTitle';
  CardHeaderToolbar.displayName = 'CardHeaderToolbar';

  CardBody.displayName = 'CardBody';
  CardFooter.displayName = 'CardFooter';
}

const dataField = [
  {
    header: 'Trạng thái',
    style: '1',
    data: {
      'status': { title: 'Trạng thái' },

    }
  }
]

interface CardProp {
  data: any;
  entity: any;
  header?: string;
  titleClassName?: string;
  dataClassName?: string;
}

export const CardStyle1 = ({ header, data, entity, titleClassName, dataClassName }: CardProp) => {
  const intl = useIntl()
  console.log(data)
  console.log(entity)
  return (
    <Card>
      {header && <h4 className='text-center text-primary p-8 border-bottom'>{intl.formatMessage({ id: header })}</h4>}
      <CardBody>
        <div className="row">
        {
          data && Object.keys(data).map((dataKey) => {
            return (
              <React.Fragment key={dataKey}>
                {data[dataKey].title && data[dataKey].title !== '' &&
                    <div className={`${data[dataKey].titleClassName ?? `${titleClassName ?? 'col-4 mb-10'}`}`}>
                      {intl.formatMessage({id: data[dataKey].title})}:
                    </div>}
                    <div className={`${dataClassName ?? 'col-8 mb-10'}`}>
                      {entity && (() => {
                        const displayInfo = data[dataKey];
                        const fieldName = displayInfo.keyField ?? dataKey;
                        const displayData = fieldName.indexOf("[") > -1 ?
                          getFieldV3(entity, fieldName) :
                          getFieldV3(entity, fieldName)[0]
                          console.log(fieldName)
                          console.log(displayData)
                        return displayInfo.formatter ? displayInfo.formatter(displayData, entity)
                          : (<>{(_.isNumber(displayData) || _.isString(displayData)) ? displayData : JSON.stringify(displayData)}</>)
                      })()
                      }
                    </div>
              </React.Fragment>
            )
          })
        }
        </div>
      </CardBody>
    </Card>
  )
}
