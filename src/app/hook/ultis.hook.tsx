import React from "react"
import { GetNotification } from "../layout/components/extras/dropdowns/user-notification-data";


export const useNotification = (page?: number, limit?: number) => {
    const [trigger, forceUpdate] = React.useReducer(x => x + 1, 0);
    const [notification, setNotification] = React.useState<any>()
    const [paging, setPaging] = React.useState({ page: page ?? 1, limit: limit ?? 5 })

    const getNotification = React.useCallback(async () => {
        try {
            const noti = await GetNotification(paging.page, paging.limit) as any
            if (noti.code !== 200 || noti.success === false) return;
            return noti.data
        } catch (err) {}
    }, [paging.page, paging.limit])

    React.useEffect(() => {
        getNotification().then(setNotification)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger, paging])

    return [notification, setPaging, forceUpdate] as const
}

export const useIntersectionObserver = (callback: () => void, ele: any) => {
    const [node, setNode] = React.useState<any>(null)
    const observer = React.useRef<any>(null)

    React.useEffect(() => {
        if (ele && (ele.isLoading || !ele.hasMore)) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
				callback()
            }
        })

        if (node) observer.current.observe(node);

        return () => observer.current.disconnect()
    }, [node, callback, ele]) 

    return [setNode]
}