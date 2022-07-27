import React, { useEffect, useState, useMemo } from 'react'
import { useCreation, useLocalStorageState, useInterval, useToggle, useMount, useLatest } from 'ahooks'
import getType from '../utils/getType'

type option = {
    protocols?: string[],
    autoReconnect?: boolean | autoReconnect,
    heartbeat?: boolean | heartbeat
}

type dataType = {
    data: string,
    [propName: string | number ]: any
}

type autoReconnect = {
    retries?: number,
    delay?: number,
    onFailed?: () => void
}

type heartbeat = {
    message?: string | number,
    interval?: number
}

type message = {
    key: string,
    message: string | ArrayBuffer | Blob
}

export const useWebSocket = (url : string, option?: option) => {
    const [interval, setInterval] = useState(5000)  //定时器默认关闭
    const [intervalName, setIntervalName] = useState('')    //定时执行的任务名
    const [connecting, setConnecting] = useState(false)    //定时执行的任务名
    const [keepHeartMessage, setKeepHeartMessage] = useState('ping')    //定时执行的任务名 默认为ping
    const [data, setData] = useState<dataType>()    //服务器返回的消息
    const [state, { toggle }] = useToggle()         //重连按钮
    const [retries, setRetries] = useState(5)       //默认重连次数五次

    const opt = useLatest(option)
    const ws = useCreation(() => new WebSocket(url,option?.protocols),[state])
    
    const clear = useInterval(() => {dispatch()},interval,{immediate:false})

    console.log(ws,'ws实例')
    console.log(opt,'option')

    const [wsKey, setWsKey] = useLocalStorageState('wsKey')



    useMount(() => {
        clear()
        setConnecting(true)
        reConnect()
    })

    useEffect(() => {

        ws.onopen = (e) => {
            clear()
            keepHeartBeat()
            setConnecting(false)
            console.log(e,'已经连接并且可以通讯');
        }
    
        ws.onclose = (e) => {
            console.log(e,'连接已关闭或者没有连接成功');
            connecting && reConnect()
        }
    
        ws.onmessage = (e) => {
            console.log(e.data);
            
            setData(e.data)
        }

        ws.onerror = (e) => {
            console.log(e);
            
        }

    },[state])

    const send = (val: string | ArrayBuffer | Blob) => {
        const msgData:message = {key:wsKey as string,message:val}
        ws.send(JSON.stringify(msgData))
    }

    const close = () => {
        ws.close()
    }

    const open = () => {

    }

    const dispatch = () => {
        console.log(intervalName,'intervalName');
        switch(intervalName){
            case 'autoReconnect':
                interval_connect()
                break;
            case 'heartbeat':
                interval_keepHeart()
                break;
        }
    }
    
    const reConnect = () => {
        setConnecting(false)
        if(option && ws.readyState !== 1 && Reflect.has(option,"autoReconnect")){
            setIntervalName('autoReconnect')
            console.log('正在重连');
            if(typeof option.autoReconnect === 'boolean' && option.autoReconnect){
                setRetries(5)
                setInterval(1000)
            } else if(typeof option.autoReconnect === 'object'){
                if(Reflect.has(option.autoReconnect as autoReconnect,"delay")){
                        setInterval(option.autoReconnect.delay as number)
                }else{
                    setInterval(5000)
                }
                if(Reflect.has(option.autoReconnect as autoReconnect,"retries")){
                    setRetries(option.autoReconnect.retries as number)
                }
            }
        }
    }

    const interval_connect = () => {
        ws.close()
        toggle()
        setRetries(val => val - 1)
        if(retries === 0){
            console.log('failed');
            clear() 
            if(typeof option?.autoReconnect === 'object') {
                if(typeof option?.autoReconnect?.onFailed === 'function'){
                    ws.close()
                    option?.autoReconnect?.onFailed()
                }   
            }
        }
    }

    const interval_keepHeart = () => {
        send(keepHeartMessage)
    }

    const keepHeartBeat = () => {
        if(option && ws.readyState === 1 && Reflect.has(option,"heartbeat")){
            console.log('保持心跳...');
            setIntervalName('heartbeat')
            
            if(typeof option.heartbeat === 'boolean' && option.heartbeat){
                setInterval(1000)
            } 
            else if(typeof option.heartbeat === 'object'){
                if(Reflect.has(option.heartbeat as heartbeat,"interval")){
                    setInterval(option.heartbeat.interval as number)
                }else{
                    setInterval(1000)
                }
                if(Reflect.has(option.heartbeat as heartbeat,"message")){
                    setKeepHeartMessage(option.heartbeat.message as string)
                }
            }
        }
    }

    return {
        status: ws.readyState,
        data,
        open,
        close,
        send
    }
}