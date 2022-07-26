import { useEffect, useState, useMemo } from 'react'
import { useEffectOnce } from 'react-use'


type option = {
    protocols: string[],
    [propName: string]: object
}

type dataType = {
    data: string,
    [propName: string | number ]: any
}

type useWebSocketType = {}

export const useWebSocket = (url : string, option?: option) => {
    // const ws = new WebSocket(url,option?.protocols)
    const [ws, setWs] = useState(new WebSocket(url, option?.protocols))
    const [data, setData] = useState<dataType>()
    // const [status, setStatus] = useState(-1)
    const [open, setOpen] = useState(false)
    const [close, setClose] = useState(true)

    useEffect(() => {
        // ws.onopen = () => {
        //     setOpen(true)
        // }
    
        // ws.onclose = () => {
        //     setClose(true)
        // }
    
        // ws.onmessage = (e) => {
        //     setData(e)
        // }
    },[])

    const send = (val: string | ArrayBuffer | Blob) => {
        ws.send(val)
    }

    

    return {
        status: ws.readyState,
        data,
        open,
        close,
        send
    }
}