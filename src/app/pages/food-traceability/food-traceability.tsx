import React from 'react';
import { RootStateOrAny, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RenderInfoDetail, RenderInfoDetailColumn } from '../../common-library/common-types/common-type';
import { AuthPage } from '../auth';
import { entityExample, exampleDetail } from './example-data';
import { GetDetail } from './food-traceability.service';
import { GetById } from './food-traceability.service';

const getExistInfo = (target: string[], current: RenderInfoDetailColumn) => {
  const viewData: RenderInfoDetailColumn = {}

  Object.keys(current).forEach(role => {
    if (target.includes(role)) {
      console.log('1')
      viewData[role] = current[role]
    }
  })

  return viewData
}

function FoodTraceability({ id }: { id?: string }) {
  const [entity, setEntity] = React.useState<any>();
  const [viewDetail, setViewDetail] = React.useState<RenderInfoDetail>(exampleDetail)
  const { auth } = useSelector((state: RootStateOrAny) => ({ auth: state.auth }), shallowEqual);

  React.useEffect(() => {
    // const vData = [exampleDetail[0], exampleDetail[1], exampleDetail[2]]
    // if (!auth?._id) {
    //   setRenderInfo(vData)
    // }
    if (id) {
      GetDetail(id).then(res => {
        setEntity(res.data);
      });
    }

    if (auth?._id) {
      GetById(auth._id).then(res => {
        const userRole: string[] = res.data?.addedScope?.enable ?? []
        const viewInfo: RenderInfoDetail = exampleDetail.map(item => {
          return ({
          ...item,
          data: getExistInfo(userRole, item.data)
        })})

        console.log(viewInfo)
        setViewDetail(viewInfo)
      }).catch(err => {
        console.log(err)
      })
    } else {
      const viewInfo: RenderInfoDetail = exampleDetail.map(item => {
        return ({
        ...item,
        data: getExistInfo([], item.data)
      })})

      console.log(viewInfo)
      setViewDetail(viewInfo)
    }
  }, [auth, id]);

  return (
    <>
      Trang chi tiết truy xuất nguồn gốc thực phẩm: {id ?? 'No info'}
      {auth?._id ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
      <h4>{!auth?._id && 'Vui lòng đăng nhập để xem nhiều thông tin hơn'}</h4>
      <div className="w-md-75 w-lg-50 mx-auto">
      </div>
    </>
  );
}

export default FoodTraceability;
