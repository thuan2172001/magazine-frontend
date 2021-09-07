import React from 'react';

export function SelectionCheckbox({isSelected, onChange, isFirstRow}: { isSelected: boolean, onChange: (e: any) => boolean | void, isFirstRow?: boolean}) {
  return (
    <>
      <input type="checkbox" style={{display: 'none'}}/>
      <label className="checkbox checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange}/>
        {
          isFirstRow ? (
            <span style={!isSelected ? {backgroundColor: "#B5B5C3"} : {}} />
          ) : (
            <span />
          )
        }
        
      </label>
    </>
  );
}

export function GroupingItemOnSelect(props: any) {
  const {ids, setIds, customerId} = props;
  if (ids.some((username: any) => username === customerId)) {
    setIds(ids.filter((username: any) => username !== customerId));
  } else {
    const newIds = [...ids];
    newIds.push(customerId);
    setIds(newIds);
  }
}

export function GroupingItemAgencyOnSelect(props: any) {
  const {ids, setIds, customerId} = props;
  if (ids.some((agency_id: any) => agency_id === customerId)) {
    setIds(ids.filter((agency_id: any) => agency_id !== customerId));
  } else {
    const newIds = [...ids];
    newIds.push(customerId);
    setIds(newIds);
  }
}

export function GroupingItemBasicUnitOnSelect(props: any) {

}

export function GroupingAllOnSelect(props: any) {
  const {isSelected, setIds, entities} = props;
  if (!isSelected) {
    const allIds: any[] = [];
    entities.forEach((el: any) => allIds.push(el.username));
    setIds(allIds);
  } else {
    setIds([]);
  }
  
  return isSelected;
}

export function GroupingAllAgencyOnSelect(props: any) {
  const {isSelected, setIds, entities} = props;
  if (!isSelected) {
    const allIds: any[] = [];
    entities.forEach((el: any) => allIds.push(el.agency_id));
    setIds(allIds);
  } else {
    setIds([]);
  }
  
  return isSelected;
}

export function GroupingAllBasicUnitOnSelect(props: any) {
  const {isSelected, setIds, basicUnitArray} = props;
  if (!isSelected) {
    const allIds: any[] = [];
    basicUnitArray.forEach((el: any) => allIds.push(el.code));
    setIds(allIds);
  } else {
    setIds([]);
  }
  
  return isSelected;
}

// check official documentations: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Selection&selectedStory=Custom%20Selection%20Column%20Header%20Style&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export function GetSelectRow(props: any) {
  const {entities, ids, setIds} = props;
  return {
    mode: 'checkbox',
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected = entities && entities.length > 0 && entities.length === ids.length;
      const props = {isSelected, entities, setIds};
      return (
        <SelectionCheckbox isSelected={isSelected} onChange={() => GroupingAllOnSelect(props)}/>
      );
    },
    selectionRenderer: ({rowIndex}: any) => {
      const isSelected = ids.some((el: any) => el === entities[rowIndex].username);
      const props = {ids, setIds, customerId: entities[rowIndex].username};
      return (
        <SelectionCheckbox isSelected={isSelected} onChange={() => GroupingItemOnSelect(props)}/>
      );
    },
  };
}

export function GetSelectAgencyRow(props: any) {
  const {entities, ids, setIds} = props;
  return {
    mode: 'checkbox',
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected = entities && entities.length > 0 && entities.length === ids.length;
      const props = {isSelected, entities, setIds};
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => GroupingAllAgencyOnSelect(props)}
        />
      );
    },
    selectionRenderer: ({rowIndex}: any) => {
      const isSelected = ids.some((el: any) => el === entities[rowIndex].agency_id);
      const props = {ids, setIds, customerId: entities[rowIndex].agency_id};
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => GroupingItemAgencyOnSelect(props)}
        />
      );
    },
  };
}

export function GetSelectBasicUnitRow(props: any) {
  const {basicUnitArray, ids, setIds} = props;
  return {
    mode: 'checkbox',
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected =
        basicUnitArray && basicUnitArray.length > 0 && basicUnitArray.length === ids.length;
      const props = {isSelected, basicUnitArray, setIds};
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => GroupingAllBasicUnitOnSelect(props)}
        />
      );
    },
    selectionRenderer: ({rowIndex}: any) => {
      const isSelected = ids.some((el: any) => el === basicUnitArray[rowIndex].code);
      const props = {ids, setIds, customerId: basicUnitArray[rowIndex].code};
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => GroupingItemBasicUnitOnSelect(props)}
        />
      );
    },
  };
}
