import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Card, CardBody } from '../../common-library/card';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import { Steps } from 'antd';
import { DefaultPagination, SortColumn } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { SearchModel } from '../../common-library/common-types/common-type';
import * as SpeciesService from '../species/species.service';
import { MasterTable } from '../../common-library/common-components/master-table';
import { MasterEntityDetailPage } from '../../common-library/common-components/master-detail-page';
import {
  CleaningDetail,
  harvestingDetail,
  PackingDetail,
  PreliminaryTreatmentDetail,
  PreservationDetail,
} from './defined/const';
import _ from 'lodash';
import {DisplayCelcius, DisplayDiffTime} from "../../common-library/helpers/detail-helpers";

const { Step } = Steps;

const productPlanCode = 'PRODUCTION_PLAN.CODE';
const harvestingCode = 'PRODUCTION_PLAN.HARVESTING_CODE';
const preliminaryTreatmentCode = 'PRODUCTION_PLAN.PreliminaryTreatment_CODE';
const cleaningCode = 'PRODUCTION_PLAN.CLEANING.CODE';
const packingCode = 'PRODUCTION_PLAN.PACKING.CODE';
const preservationCode = 'PRODUCTION_PLAN.PRESERVATION.CODE';

const extendSearchField: SearchModel = {
  species: {
    type: 'search-select',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    onSearch: SpeciesService.GetAll,
    onChange: (value, { values }) => {
      console.log(value, values);
      if (value) value.barcode = values.product_plan?.seeding?.species?.barcode;
      else return { barcode: values.product_plan?.seeding?.species?.barcode };
    },
    keyField: 'name',
    name: 'seeding.species',
  },
  barcode: {
    type: 'string',
    label: 'GTIN',
    name: 'seeding.species.barcode',
  },
};


const TAB_PROCESS = {
  harvesting: '2,3,4,5,6,7',
  preliminaryTreatment: '3,4,5,6,7',
  cleaning: '4,5,6,7',
  packing: '5,6,7',
  preservation: '6,7',
}

const TAB_STEP = {
  harvesting: 0,
  preliminaryTreatment: 1,
  cleaning: 2,
  packing: 3,
  preservation: 4
}

function ProductionManagement() {
  const intl = useIntl();

  return (<></>
  );
}

export default ProductionManagement;
