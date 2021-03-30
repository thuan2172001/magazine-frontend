import React from 'react';
import { Tabs } from 'antd';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import { MasterTable } from '../../common-library/common-components/master-table';
import { DefaultPagination } from '../../common-library/common-consts/const';
import { useIntl } from 'react-intl';
import AddIcon from '@material-ui/icons/Add';
import { iconStyle } from '../../common-library/common-consts/const';
const { TabPane } = Tabs;

function UserBody({
  tabData,
  setCurrentTab,
  currentTab,
  setEntities,
  setPaginationProps,
  trigger,
  setTrigger,
  title,
}: {
  tabData: any[];
  setCurrentTab: (tab: string | undefined) => void;
  currentTab: string | undefined;
  setEntities: (el: any) => void;
  setPaginationProps: (el: any) => void;
  trigger: boolean;
  setTrigger: (entity: boolean) => void;
  title?: string;
}) {
  const intl = useIntl();

  function callback(key: string | undefined) {
    if (key === currentTab) {
      setTrigger(!trigger);
    } else {
      setCurrentTab(key);
    }
    setEntities([]);
    setPaginationProps(DefaultPagination);
  }
  console.log(tabData);

  return (
    <Card>
      {title && <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />}
      <CardBody>
        <Tabs defaultActiveKey={currentTab} onChange={callback} tabBarStyle={{ color: '#27AE60' }}>
          {tabData.map((item: any, key: number) => (
            <TabPane tab={item.tabTitle} key={'' + key}>
              {item.button?.length > 0 ? (
                <div className="row no-gutters mb-10">
                  {item.button.map((btn: any, key: number) => (
                    <button
                      type="button"
                      key={key}
                      className="btn btn-primary fixed-btn-width mr-8"
                      onClick={btn.onClick}>
                      <AddIcon style={iconStyle} />
                      {intl.formatMessage({ id: btn.label })}
                    </button>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <MasterTable
                entities={item.entities}
                columns={item.columns}
                total={item.total}
                loading={item.loading}
                paginationParams={item.paginationParams}
                setPaginationParams={item.setPaginationParams}
              />
            </TabPane>
          ))}
        </Tabs>
        {/* <MasterTreeStructure /> */}
      </CardBody>
    </Card>
  );
}

export default UserBody;
