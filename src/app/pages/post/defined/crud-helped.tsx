import _ from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CompareDate } from './const';

export const notifyError = (error: string) => {
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

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export const diff = (obj1: any, obj2: any) => {
  if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
    return obj1;
  }

  let diffs: any = {};
  let key;

  let arraysMatch = function(arr1: any, arr2: any) {

    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  let compare = function(item1: any, item2: any, key: any) {

    let type1 = Object.prototype.toString.call(item1);
    let type2 = Object.prototype.toString.call(item2);

    // if (type2 === '[object Undefined]') {
    //   diffs[key] = null;
    //   return;
    // }

    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    if (type1 === '[object Object]') {
      let objDiff: any = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    if (type1 === '[object Array]') {
      if (!arraysMatch(item1, item2)) {
        diffs[key] = item2;
      }
      return;
    }

    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[key] = item2;
      }
    }
  };

  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      compare(obj1[key], obj2[key], key);
    }
  }

  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  }

  return diffs;
};

export const validField = [
  'harvesting',
  'preliminaryTreatment',
  'cleaning',
  'packing',
  'preservation',
  'unit'
];

export const validNested = [
  'estimatedTime',
  'estimatedQuantity',
  'technical',
  'leader',
  'estimatedExpireTimeStart',
  'estimatedExpireTimeEnd',
  'packing',
  'estimatedStartTime',
  'estimatedEndTime',
  'unit'
];

export const validationForm = (values: any) => {
    const errors: any = {};

    console.log(values);

    const unit = values.unit

    const harvestingLeader = values.harvesting?.leader;
    const harvestingTechnical = values.harvesting?.technical;

    const ptEstimatedTime = values.preliminaryTreatment?.estimatedTime;
    const ptEstimatedQuantity = values.preliminaryTreatment?.estimatedQuantity;
    const ptLeader = values.preliminaryTreatment?.leader;
    const ptTechnical = values.preliminaryTreatment?.technical;

    const cleaningEstimatedTime = values.cleaning?.estimatedTime;
    const cleaningEstimatedQuantity = values.cleaning?.estimatedQuantity;
    const cleaningLeader = values.cleaning?.leader;
    const cleaningTechnical = values.cleaning?.technical;

    const packingEstimatedTime = values.packing?.estimatedTime;
    const packingEstimatedExpireTimeStart = values.packing?.estimatedExpireTimeStart;
    const packingEstimatedExpireTimeEnd = values.packing?.estimatedExpireTimeEnd;
    const packingPacking = values.packing?.packing;
    const packingEstimatedQuantity = values.packing?.estimatedQuantity;
    const packingTechnical = values.packing?.technical;
    const packingLeader = values.packing?.leader;

    const preservationEstimatedStartTime = values.preservation?.estimatedStartTime;
    const preservationEstimatedEndTime = values.preservation?.estimatedEndTime;
    const preservationTechnical = values.preservation?.technical;

    // ---------------------------------------------------------------

    // if (harvestingLeader?.length === 0 && harvestingTechnical?.length > 0) {
    //   if (!errors.harvesting) {
    //     errors.harvesting = {};
    //   }
    //   errors.harvesting.leader = 'Tổ trưởng thu hoạch không được bỏ trống';
    // }

    // if (harvestingTechnical?.length === 0 && harvestingLeader?.length > 0) {
    //   if (!errors.harvesting) {
    //     errors.harvesting = {};
    //   }
    //   errors.harvesting.technical = 'Nhân viên kỹ thuật thu hoạch không được bỏ trống';
    // }

    // ---------------------------------------------------------------

    // if (
    //   !ptEstimatedTime &&
    //   (ptEstimatedQuantity || ptLeader?.length > 0 || ptTechnical?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.estimatedTime = 'Thời gian sơ chế không được bỏ trống';
    // }

    // if (
    //   !ptEstimatedQuantity &&
    //   (ptEstimatedTime || ptLeader?.length > 0 || ptTechnical?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.estimatedQuantity = 'Sản lượng sơ chế không được bỏ trống';
    // }

    // if (
    //   ptLeader?.length === 0 &&
    //   (ptEstimatedTime || ptEstimatedQuantity || ptTechnical?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.leader = 'Tổ trưởng sơ chế không được bỏ trống';
    // }

    // if (
    //   ptTechnical?.length === 0 &&
    //   (ptEstimatedTime || ptEstimatedQuantity || ptLeader?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.technical = 'Nhân viên kỹ thuật sơ chế không được bỏ trống';
    // }

    // ---------------------------------------------------------------

    // if (
    //   !cleaningEstimatedTime &&
    //   (cleaningEstimatedQuantity || cleaningLeader?.length > 0 || cleaningTechnical?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.estimatedTime = 'Thời gian làm sạch không được bỏ trống';
    // }

    // if (
    //   !cleaningEstimatedQuantity &&
    //   (cleaningEstimatedTime || cleaningLeader?.length > 0 || cleaningTechnical?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.estimatedQuantity = 'Sản lượng làm sạch không được bỏ trống';
    // }

    // if (
    //   cleaningLeader?.length === 0 &&
    //   (cleaningEstimatedTime || cleaningEstimatedQuantity || cleaningTechnical?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.leader = 'Tổ trưởng làm sạch không được bỏ trống';
    // }

    // if (
    //   cleaningTechnical?.length === 0 &&
    //   (cleaningEstimatedTime || cleaningEstimatedQuantity || cleaningLeader?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.technical = 'Nhân viên kỹ thuật làm sạch không được bỏ trống';
    // }

    // ---------------------------------------------------------------

    // if (
    //   !packingEstimatedTime &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedTime = 'Thời gian đóng gói không được bỏ trống';
    // }

    // if (
    //   !packingEstimatedExpireTimeStart &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedTime ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedExpireTimeStart = 'Hạn sử dụng không được bỏ trống';
    // }

    // if (
    //   !packingEstimatedExpireTimeEnd &&
    //   (packingEstimatedTime ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedExpireTimeEnd = 'Ngày hết hạn không được bỏ trống';
    // }

    // if (
    //   !packingPacking &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingEstimatedTime ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.packing = 'Quy cách đóng gói không được bỏ trống';
    // }

    // if (
    //   !packingEstimatedQuantity &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedTime ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedQuantity = 'Số lượng đóng gói không được bỏ trống';
    // }

    // if (
    //   packingTechnical?.length === 0 &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingEstimatedTime)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.technical = 'KCS không được bỏ trống';
    // }

    // if (
    //   packingLeader?.length === 0 &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingEstimatedTime ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.leader = 'Tổ trưởng đóng gói không được bỏ trống';
    // }

    // ---------------------------------------------------------------

    // if (!unit) {
    //   if (!errors.unit) {
    //     errors.unit = {};
    //   }
    //   errors.unit[''] = 'Vui lòng chọn đơn vị tính';
    // }

    if (ptEstimatedQuantity) {
      if (!_.isInteger(ptEstimatedQuantity)) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedQuantity = 'Sản lượng sơ chế phải là số nguyên';
      } else if (ptEstimatedQuantity < 0) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedQuantity = 'Sản lượng sơ chế không được nhỏ hơn 0';
      } else if (
        values.planting?.expectedQuantity &&
        ptEstimatedQuantity > values.planting?.expectedQuantity
      ) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedQuantity =
          'Sản lượng sơ chế không được lớn hơn sản lượng thu hoạch';
      }
    }

    if (ptEstimatedTime) {
      if (!CompareDate(new Date(ptEstimatedTime), new Date())) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedTime = 'Ngày sơ chế không được nhỏ hơn ngày hiện tại';
      } else if (
        values.planting?.estimatedHarvestTime &&
        !CompareDate(new Date(ptEstimatedTime), new Date(values.planting?.estimatedHarvestTime))
      ) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedTime = 'Ngày sơ chế không được nhỏ hơn ngày thu hoạch';
      }
    }

    // Cleaning

    if (cleaningEstimatedQuantity) {
      if (!_.isInteger(cleaningEstimatedQuantity)) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedQuantity = 'Sản lượng làm sạch phải là số nguyên';
      } else if (cleaningEstimatedQuantity < 0) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedQuantity = 'Sản lượng làm sạch không được nhỏ hơn 0';
      } else if (ptEstimatedQuantity && cleaningEstimatedQuantity > ptEstimatedQuantity) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedQuantity =
          'Sản lượng làm sạch không được lớn hơn sản lượng sơ chế';
      }
    }

    if (cleaningEstimatedTime) {
      if (!CompareDate(new Date(cleaningEstimatedTime), new Date())) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedTime = 'Ngày làm sạch không được nhỏ hơn ngày hiện tại';
      } else if (
        ptEstimatedTime &&
        !CompareDate(new Date(cleaningEstimatedTime), new Date(ptEstimatedTime))
      ) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedTime = 'Ngày làm sạch không được nhỏ hơn ngày sơ chế';
      }
    }

    // Packing

    if (values.packing && packingEstimatedQuantity && !_.isInteger(packingEstimatedQuantity)) {
      if (!errors.packing) {
        errors.packing = {};
      }
      errors.packing.estimatedQuantity = 'Số lượng đóng gói phải là số nguyên';
    } else if (values.packing && packingEstimatedQuantity && packingEstimatedQuantity < 0) {
      if (!errors.packing) {
        errors.packing = {};
      }
      errors.packing.estimatedQuantity = 'Số lượng đóng gói không được nhỏ hơn 0';
    }

    if (packingEstimatedTime) {
      if (!CompareDate(new Date(packingEstimatedTime), new Date())) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedTime = 'Ngày đóng gói không được nhỏ hơn ngày hiện tại';
      } else if (
        cleaningEstimatedTime &&
        !CompareDate(new Date(packingEstimatedTime), new Date(cleaningEstimatedTime))
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedTime = 'Ngày đóng gói không được nhỏ hơn ngày làm sạch';
      } else if (
        packingEstimatedExpireTimeStart &&
        CompareDate(new Date(packingEstimatedTime), new Date(packingEstimatedExpireTimeStart))
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedTime = 'Ngày đóng gói không được lớn hơn hạn sử dụng bắt đầu';
      }
    }

    if (packingEstimatedExpireTimeStart) {
      if (!CompareDate(new Date(packingEstimatedExpireTimeStart), new Date())) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeStart = 'Hạn sử dụng không được nhỏ hơn ngày hiện tại';
      } else if (
        packingEstimatedTime &&
        CompareDate(new Date(packingEstimatedTime), new Date(packingEstimatedExpireTimeStart))
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeStart =
          'Hạn sử dụng bắt đầu không được nhỏ hơn ngày đóng gói';
      } else if (
        values.packing.estimatedExpireTimeEnd &&
        !CompareDate(
          new Date(packingEstimatedExpireTimeEnd),
          new Date(packingEstimatedExpireTimeStart),
        )
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeStart =
          'Hạn sử dụng bắt đầu không được lớn hơn ngày hết hạn';
      }
    }

    if (packingEstimatedExpireTimeEnd) {
      if (!CompareDate(new Date(packingEstimatedExpireTimeEnd), new Date())) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeEnd = 'Ngày hết hạn không được nhỏ hơn ngày hiện tại';
      } else if (
        packingEstimatedExpireTimeStart &&
        !CompareDate(
          new Date(packingEstimatedExpireTimeEnd),
          new Date(packingEstimatedExpireTimeStart),
        )
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeEnd =
          'Ngày hết hạn không được nhỏ hơn hạn sử dụng bắt đầu';
      }
    }

    // Preservation

    if (preservationEstimatedStartTime) {
      if (!CompareDate(new Date(preservationEstimatedStartTime), new Date())) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedStartTime = 'Ngày bảo quản không được nhỏ hơn ngày hiện tại';
      } else if (
        packingEstimatedTime &&
        CompareDate(new Date(packingEstimatedTime), new Date(preservationEstimatedStartTime))
      ) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedStartTime =
          'Ngày bắt đầu bảo quản không được nhỏ hơn ngày đóng gói';
      } else if (
        preservationEstimatedEndTime &&
        !CompareDate(
          new Date(preservationEstimatedEndTime),
          new Date(preservationEstimatedStartTime),
        )
      ) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedStartTime =
          'Ngày bắt đầu bảo quản không được lớn hơn ngày kết thúc bảo quản';
      }
    }

    if (preservationEstimatedEndTime) {
      if (!CompareDate(new Date(preservationEstimatedEndTime), new Date())) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedEndTime =
          'Ngày kết thúc bảo quản không được nhỏ hơn ngày hiện tại';
      } else if (
        preservationEstimatedStartTime &&
        !CompareDate(
          new Date(preservationEstimatedEndTime),
          new Date(preservationEstimatedStartTime),
        )
      ) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedEndTime =
          'Ngày kết thúc bảo quản không được nhỏ hơn ngày bắt đầu bảo quản';
      }
    }

    return errors;
  };
