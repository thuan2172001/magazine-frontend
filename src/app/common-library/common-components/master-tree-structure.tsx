import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TreeData } from '../../pages/multilevel-sale/multilevel-sale.model';
import { ChildFriendly } from '@material-ui/icons';
import { ConvertStatusToBoolean } from '../helpers/common-function';
import './master-tree-structure.scss'

interface TreeDataProp {
  data: TreeData[];
  onCreate?: (entity: any) => void;
    onEdit?: (entity: any) => void;
    onDelete?: (entity: any) => void;
    onFetchEntities?: (entity: any) => void;
}

const MasterTreeStructure: React.FC<TreeDataProp> = ({ data, onCreate, onEdit, onDelete, onFetchEntities }) => {
  const [currentChild, setCurrentChild] = useState<string | undefined>()

  const handleAdd = (data: TreeData): void => {
    if (onCreate) {
      onCreate(data)
    }
  }
  const handleEdit = (data: TreeData): void => {
    if (onEdit) {
      onEdit(data)
    }
  };

  const handleClick = (data: TreeData): void => {
    console.log(data);
    setCurrentChild(data._id)
    if (onFetchEntities) {
      onFetchEntities(data)
    }
  }

  const handleDelete = (data: TreeData): void => {
    console.log(data);
    if (onDelete) {
      onDelete(data)
    }
  }



  const renderChild = (data: TreeData[], size: number, skipDistance: number) => {
    return (
      <>
        {data.map((childrenItem: TreeData, keyItem: number) => (
          <React.Fragment key={'childrenren' + keyItem}>
            <tr style={{backgroundColor:(currentChild === childrenItem._id ? 'rgba(39, 174, 96,0.1)' : 'transparent')}}>
              <td onClick={() => handleClick(childrenItem)} className={currentChild === childrenItem._id ? 'text-primary font-weight-700' : ''}  >
                <div style={{ marginLeft: `${size}px` }}>
                  {/* {childrenItem.children && childrenItem.children.length > 0 ? (
                    <button
                      onClick={() => onShowChildren(childrenItem._id)}
                      style={{ backgroundColor: 'white', border: 'none' }}>
                      {'>'}
                    </button>
                  ) : (
                    <button
                      onClick={() => onShowChildren(childrenItem._id)}
                      style={{ backgroundColor: 'white', border: 'none' }}>
                      {'\u00A0'}
                    </button>
                  )} */}
                  <span onClick={() => {
                    // console.log('ahihi')
                    }} style={{ cursor: 'pointer' }}>{childrenItem.name}</span>
                </div>
              </td>
              {(onCreate || onEdit || onDelete) &&
              <td>
                <div className="text-right" >
                {onCreate && (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    onClick={() => handleAdd(childrenItem)}
                    className="text-primary">
                    <AddIcon />
                  </button>
                )}
                {onEdit && (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    onClick={() => handleEdit(childrenItem)}
                    className="text-primary">
                    <EditIcon />
                  </button>
                )}
                {onDelete && (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    onClick={() => handleDelete(childrenItem)}
                    className="text-primary">
                    <DeleteIcon />
                  </button>
                )}
                </div>
              </td>
              }
            </tr>
            {
              childrenItem.children &&
              childrenItem.children.length > 0 &&
              renderChild(childrenItem.children, size + skipDistance, skipDistance)}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      {/* {data.map((value: TreeData, key: number) => { */}
      <Table borderless style={{ tableLayout: 'fixed' }} className="tree-table">
        <tbody>
          {renderChild(data, 0, 25)}

          {/* {data.map((value: TreeData, key: number) => {
              return (

              // <tr>
              //   <td className="w-50">
              //     <div className="mb-5">
              //       <button
              //         onClick={() => onShowChildren(value._id)}
              //         style={{ backgroundColor: 'white', border: 'none' }}>
              //         {'>'}
              //       </button>
              //       <span onClick={() => onShowChildren(value._id)}>{value.name}</span>
              //     </div>
              //   </td>
              //   <td>
              //     <button
              //       style={{ backgroundColor: 'white', border: 'none' }}
              //       className="text-primary"
              //       onClick={() => onEdit(value)}>
              //       <AddIcon />
              //     </button>
              //     <button
              //       style={{ backgroundColor: 'white', border: 'none' }}
              //       className="text-primary"
              //       onClick={() => onEdit(value)}>
              //       <EditIcon />
              //     </button>
              //   </td>
              // </tr>
              showChildrenV2[value._id] && renderChild(value.children, 3.75, 3.75)
            )})} */}
        </tbody>
      </Table>

      {/* })} */}
    </>
  );
};

export default MasterTreeStructure;
