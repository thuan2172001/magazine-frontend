import React, {MouseEventHandler, useCallback, useEffect, useState} from 'react';
import { DetailImage } from '../common-components/detail/detail-image';
import { format } from 'date-fns';
import { IntlShape, useIntl } from 'react-intl';
import { MasterTable } from '../common-components/master-table';
import { MasterBodyColumns, PaginationProps } from '../common-types/common-type';
import { GetCompareFunction } from './common-function';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';

export const DisplayString = (input: string) => {
  if (!input) return <></>;
  return <>{input}</>;
};
export const DisplayCelcius = (input: string) => {
  if (!input) return <></>;
  return <>{input + '°C'}</>;
};

export const DisplayPersonName = (name: {
  firstName?: string;
  lastName?: string;
  fullName?: string;
}) => {
  const intl = useIntl();
  return (
    <>
      {name.fullName ??
        (name.firstName
          ? `${name.firstName} ${name.lastName}`
          : intl.formatMessage({ id: 'NO_INFORMATION' }))}
    </>
  );
};

export const DisplayPersonNameByArray = (person: any[]) => {
  // if (!_.isArray(person)) return <></>;
  return (
    <>
      {person.map((personInfo: any, key: number) => (
        <React.Fragment key={key}>
          {personInfo.user ? personInfo.user.fullName : personInfo.fullName}
          {key < person.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </>
  );
};

export const DisplayPercent = (input: string) => {
  if (!input) return <></>;
  return <>{(parseFloat(input) * 100).toFixed(2) + '%'}</>;
};

export const DisplayArray = (arr: string[], separator: string = ', ') => {
  if (!arr) return <></>;
  return <>{arr.join(separator)}</>;
};

export const DisplayAddress = (address: {
  address?: string;
  district: string;
  city: string;
  state: string;
}) => {
  const addressString = `${address.address ? `${address.address},` : ''} ${address.district}, ${
    address.city
  }, ${address.state}`;
  return <>{addressString}</>;
};
export const DisplayDate = ({ input, _format }: { input: string; _format?: string }) => {
  const intl = useIntl();
  if (!input) return <></>;
  const date_input = new Date(input);

  return (
    <>
      {input
        ? format(moment(date_input).toDate(), _format ?? 'dd/MM/yyyy')
        : intl.formatMessage({ id: 'NO_INFORMATION' })}
    </>
  );
};

export const DisplayDateTime = ({ input, _format }: { input?: string; _format?: string }) => {
  const intl = useIntl();
  if (!input) return <></>;
  const date_input = new Date(input);
  return (
    <>
      {input
        ? format(moment(date_input).toDate(), _format ?? 'dd/MM/yyyy h:mma')
        : intl.formatMessage({ id: 'NO_INFORMATION' })}
    </>
  );
};

export const DisplayUnit = ({ input }: { input?: string | number }) => {
  const intl = useIntl();
  if (!input) return <></>;
  return <>{intl.formatMessage({ id: _.toString(input) })}</>;
};

const isBase64 = (s: string) => s.indexOf('data:image') == 0;
// export const DisplayDownloadLink = ({input, key, name}:{input: any, key?: string, name?: string}) => {
//   return DisplD
// }
export const DisplayDownloadLink = (input: any, key?: string, name?: string) => {
  const intl = useIntl();
  const download = useCallback<MouseEventHandler<any>>((e)=>{
    const path = key ? input[key] : input;
    if(isBase64(path)){
      const anchor = document.createElement('a');
      anchor.href = path;
      anchor.download = name ?? 'default.name';
      anchor.click();
      anchor.parentNode?.removeChild(anchor);
    } else {
      axios.get(`${path}`, { responseType: 'blob' }).then(response =>{
        const windowUrl = window.URL || window.webkitURL;
        const url = windowUrl.createObjectURL(response);
        const anchor = document.createElement('a');
        anchor.href = url;
        const _pathA = path.split('/');
        anchor.download = name ?? _pathA[_pathA.length-1];
        anchor.click();
        anchor.parentNode?.removeChild(anchor);
        windowUrl.revokeObjectURL(url);
      });
    }
    e.preventDefault();
  }, [input,name]);
  if (!input) return (<></>);
  return (
    <a href={'#'} onClick={download}>
      {name ? <>{name}</> : intl.formatMessage({ id: 'CLICK_TO_DOWNLOAD' })}
    </a>
  );
};

export const DisplayInnerLink = ({ link, title }: { link: any; title?: string }) => {
  const intl = useIntl();
  if (!link) return <></>;
  return <Link to={link}>{title ?? intl.formatMessage({ id: 'CLICK_TO_VIEW' })}</Link>;
};

export const DisplayTable = ({
  entities,
  columns,
}: {
  entities: any[];
  columns: MasterBodyColumns;
}) => {
  const [paginationParams, setPaginationParams] = useState<PaginationProps>({
    sortBy: '',
    sortType: '',
  });
  const [_innerEntities, setEntities] = useState(entities);
  const [_innerColumns, setColumns] = useState(columns);
  const intl = useIntl();
  useEffect(() => {
    let es = entities;
    if (es) {
      es = es.sort(
        GetCompareFunction({
          key: paginationParams.sortBy,
          orderType: paginationParams.sortType === 'asc' ? 1 : -1,
        }),
      );
    }
    setEntities(es);
  }, [entities, paginationParams]);
  useEffect(() => {
    setColumns(
      Object.values(columns).map(c => ({ ...c, text: intl.formatMessage({ id: c.text }) })),
    );
  }, [columns]);
  return (
    <MasterTable
      entities={_innerEntities}
      columns={_innerColumns}
      paginationParams={paginationParams}
      setPaginationParams={setPaginationParams}
      disablePagination={true}
    />
  );
};

export const DisplayCoordinates = (arr: string[]) => {
  return arr && arr.length == 2 ? (
    <a
      href={`https://google.com/maps/search/${arr[1]},+${arr[0]}`}
      rel="noopener noreferrer"
      target={'_blank'}>{`${arr[1]}, ${arr[0]}`}</a>
  ) : (
    <></>
  );
};

export const Display3Info = (image: any, _: any, intl?: IntlShape) => {
  return (
    <>
      <div className={'titleeee mb-1'}>
        {intl?.formatMessage({ id: 'IMAGE.TAKEN_BY' })}
        <DisplayPersonName {...image.takenBy} />
      </div>
      <div className={'titleeee mb-1'}>
        {intl?.formatMessage({ id: 'IMAGE.TAKEN_TIME' })}
        {image.takenTime ? (
          <DisplayDateTime input={image.takenTime} />
        ) : (
          intl?.formatMessage({ id: 'NO_INFORMATION' })
        )}
      </div>
      <div className={'titleeee mb-1'}>
        {intl?.formatMessage({ id: 'IMAGE.LOCATION' })}
        {image.location?.coordinates
          ? DisplayCoordinates(image.location?.coordinates)
          : intl?.formatMessage({ id: 'NO_INFORMATION' })}
      </div>
    </>
  );
};

export const DisplayImage = (
  images: any,
  renderInfo?: { title?: string; data?: { [KeyField: string]: string } },
  filter?: any[],
) => {
  if (_.isArray(images) && filter && filter.length > 0) {
    return (
      <DetailImage
        images={images.filter((el: any) => el[filter[0]] === filter[1])}
        renderInfo={renderInfo}
      />
    );
  }

  return <DetailImage images={images} renderInfo={renderInfo} />;
};

export const DisplayDiffTime = ({
  startTime,
  endTime,
}: {
  startTime?: string;
  endTime?: string;
}) => {
  return (
    <>
      <DisplayDateTime input={startTime} />
      {endTime ? ' - ' : ''}
      <DisplayDateTime input={endTime} />
    </>
  );
};

interface Info {
  agency: {
    address: {
      address?: string;
      district: string;
      city: string;
      state: string;
    };
    _id: string;
    name: string;
  };
  time: any;
  [X: string]: any;
}

export const DisplayDistribution = (input: Info[]) => {
  if (!_.isArray(input)) return <></>;
  console.log(input);

  return (
    <>
      {input.map(
        (
          item: {
            agency: {
              address: {
                address?: string;
                district: string;
                city: string;
                state: string;
              };
              _id: string;
              name: string;
            };
            time: any;
            [X: string]: any;
          },
          key: number,
        ) => {
          return (
            <div
              key={key}
              className={
                'd-flex justify-content-between' +
                (key < input.length - 1 ? ' border-bottom pb-3 mb-5' : '')
              }>
              <div>
                <p className="font-weight-bolder" style={{ fontSize: 14 }}>
                  {item.agency.name}
                </p>
                <p style={{ fontSize: 11 }}>{DisplayAddress(item.agency.address)}</p>
              </div>
              <div>{<DisplayDateTime input={item.time} />}</div>
            </div>
          );
        },
      )}
    </>
  );
};

const DisplayInfoCard = ({ name, time, address, toRight }: { name: string; time: any; address: any; toRight?: boolean }) => {
  return (
    <div className={toRight ? "text-right" : ""}>
      <p className="font-weight-bolder" style={{ fontSize: 13 }}>
        {name}
      </p>
      <div>{<DisplayDateTime input={time} />}</div>
      <p className="mt-3" style={{ fontSize: 11 }}>{DisplayAddress(address)}</p>
    </div>
  );
};

export const DisplayShipping = ({
  input,
}: {
  input: { _id: string; from: Info; to: Info; [X: string]: any }[];
}) => {
  if (!input) return <></>;

  return (
    <>
      {input.map((item: { _id: string; from: Info; to: Info; [X: string]: any }, key: number) => (
        <div
          key={key}
          className={
            'd-flex justify-content-between' +
            (key < input.length - 1 ? ' border-bottom pb-3 mb-5' : '')
          }>
          <DisplayInfoCard
            name={item.from.agency.name}
            time={item.from.time}
            address={item.from.agency.address}
          />
          <div>
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.70663 9.75922C6.64404 9.82233 6.55884 9.85782 6.46996 9.85782C6.38108 9.85782 6.29588 9.82233 6.23329 9.75922L6.09996 9.62589C6.03485 9.56317 5.99865 9.47628 5.99996 9.38589V6.99922H0.999959C0.815864 6.99922 0.666626 6.84999 0.666626 6.66589V3.33256C0.666626 3.14846 0.815864 2.99922 0.999959 2.99922H5.99996V0.612558C5.99865 0.522167 6.03485 0.435275 6.09996 0.372558L6.23329 0.239224C6.29588 0.17612 6.38108 0.140625 6.46996 0.140625C6.55884 0.140625 6.64404 0.17612 6.70663 0.239224L11.2333 4.76589C11.2977 4.82638 11.3343 4.91083 11.3343 4.99922C11.3343 5.08761 11.2977 5.17207 11.2333 5.23256L6.70663 9.75922Z"
                fill="#27AE60"
              />
            </svg>
          </div>
          <DisplayInfoCard
            name={item.to.agency.name}
            time={item.to.time}
            address={item.to.agency.address}
            toRight
          />
        </div>
      ))}
    </>
  );
};
