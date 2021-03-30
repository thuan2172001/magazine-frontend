import React from 'react';
import { Card, CardBody } from '../../common-library/card';
import { TextareaAutosize } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosResponse } from 'axios';
import _ from 'lodash';

const notifyError = (error: string) => {
  toast.error(error, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const PostComments = ({
                                  entity,
                                  onComments,
                                }: {
  entity?: any;
  onComments?: (entity: any, data: { content: string }) => Promise<AxiosResponse<any>>;
}) => {
  const valueRef = React.useRef<any>({ value: '' });
  const [commentsArr, setCommentArr] = React.useState(entity?.comments || []);

  React.useEffect(() => {
    if (entity) {
      setCommentArr(entity.comments)
    }
  }, [entity])

  const handleComment = (entity: any, comment: any) => {
    if (onComments && entity) {
      onComments(entity, comment)
          .then(res => {
            setCommentArr(res.data);
            // setComment({ content: '' });
            valueRef.current.value = '';
          })
          .catch(err => {
            throw err;
          });
    }
  };

  return (
      <Card>
        <CardBody>
          <div className="pl-xl-15 pl-md-10 pl-5 mb-5">
            <span className="modify-subtitle text-primary mt-8">COMMENTS</span>
            <div className="mt-8 border border-light rounded pt-5 pb-5">
              {//entityForEdit.comments
                // [
                //   {
                //     fullName: 'Đầu khấc',
                //     content:
                //       'Kế hoạch như tốt mai cho nghỉ việc..........vsdgkdfhkdfoihnsoirnhiosgboisdnbiodrgiosehuigheubguiwebguwebiugwebfiuwebfiuwebguiebgierdnhiordnhoifdnhidofjhpọhpotfjpofk',
                //   },
                //   {
                //     fullName: 'Đầu khấc',
                //     content:
                //       'Kế hoạch như tốt mai cho nghỉ việc..........vsdgkdfhkdfoihnsoirnhiosgboisdnbiodrgiosehuigheubguiwebguwebiugwebfiuwebfiuwebguiebgierdnhiordnhoifdnhidofjhpọhpotfjpofk',
                //   },
                // ]
                commentsArr?.map(
                    (
                        value: { createdBy: { _id: string; fullName: string }; content: string },
                        key: number,
                    ) => (
                        <div key={key} className="row mb-3">
                          <div className="col-1 text-center">
                            <AccountCircleOutlinedIcon style={{ fontSize: 30 }} />
                          </div>
                          <div className="col-10 bg-light rounded p-3">
                            <p className="font-bold">
                              {_.isString(value.createdBy)
                                  ? value.createdBy
                                  : value.createdBy.fullName
                                      ? value.createdBy.fullName
                                      : 'Anonymous'}
                            </p>
                            <p>{value.content}</p>
                          </div>
                        </div>
                    ),
                )}
              <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                  <div className="row">
                    <div className="col-11">
                      <TextareaAutosize
                          className="form-control"
                          rowsMin={1}
                          aria-label="empty textarea"
                          ref={valueRef}
                          placeholder="Write comment..."
                      />
                    </div>
                    <div className="col-1">
                      <button
                          className="btn btn-primary pl-11 pr-11"
                          onClick={() => {
                            if (valueRef.current.value !== '') {
                              handleComment(entity, { content: valueRef.current.value });
                            } else {
                              notifyError('Comment is empty!');
                            }
                          }}>
                        Sent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
  );
};

export default PostComments;
