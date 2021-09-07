import axios from "axios";
import { API_BASE_URL } from "../../../../common-library/common-consts/enviroment";

const api = API_BASE_URL + '/notification'

export const GetNotification = (page?: number, limit?: number) => {
    if (!page) page = 1;
    if (!limit) limit = 10;
    return axios.get(api, { params: { page, limit } })
}

// interface NotificationNavItem {
//     eventKey: string;
//     label: string;
//     className: string;
//     _navClassName?: string;
//     data?: { icon: HTMLElement | ReactElement; notificationName: string | ReactElement; timestamp: string | ReactElement }[]
// }

// export const NotificationNavItem: any[] = [
//     { 
//         _navClassName: 'nav-item',
//         eventKey: 'Events',
//         label: 'Events',
//         className: `nav-link show`,
//         data: [
//             {
//                 icon: <i className="flaticon2-line-chart text-success"/>,
//                 notificationName: 'Giám đốc đã từ chối kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-paper-plane text-danger"/>,
//                 notificationName: 'Kế hoạch đã được duyệt',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             },
//             {
//                 icon: <i className="flaticon2-user flaticon2-line- text-success"/>,
//                 notificationName: 'Giám đốc đã bình luận về kế hoạch',
//                 timestamp: '23 hrs ago'
//             }
//         ]
//     },
// ]