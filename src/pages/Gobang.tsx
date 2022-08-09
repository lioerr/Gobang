import React, { useEffect, useState } from 'react'
import { chunk } from 'lodash'
import { compute } from '@/method'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useLocalStorageState, useMount } from 'ahooks'


// socket.connect()
const randomKey = Math.random().toString(16).slice(2, -1)

// const ws = new WebSocket(`ws://192.168.43.77:9001/ws/${randomKey}`);



// console.log('ws连接状态：' + ws.readyState);

export default () => {
  const [boardInfo, setBoardInfo] = useState<Array<Grid>>([])
  const [lastBoardInfo, setLastBoardInfo] = useState<Array<Grid>>([])
  const [size, setSize] = useState<number>(12)
  const [successNum, setSuccessNum] = useState<number>(5)
  const [success, setSuccess] = useState<boolean>(false)
  const [WSString, setWSString] = useState<string>('')

  const [wsKey, setWsKey] = useLocalStorageState('wsKey', {
    defaultValue: randomKey
  })

  const { status, data, send } = useWebSocket(`ws://192.168.43.77:9001/ws/${wsKey}`, {
    autoReconnect: true,
    heartbeat: {
      message: Math.random().toString(16).slice(2, -1),
      interval: 3000
    }
  })

  const sendMsg = () => {
    send(JSON.stringify({ msg: WSString, key: randomKey }))
  }


  console.log(status, 'status');

  useMount(() => { setWsKey(randomKey) })

  function init() {
    let gridArr: Grid[] = []
    let grid = new Array(size * size).fill(null)
    chunk(grid, size).forEach((item, r_index) => {
      item.forEach((_, d_index) => {
        const gridInfo = {
          x: r_index,
          y: d_index,
          is: false,
          success: false
        }
        console.log(chunk(grid));

        gridArr.push(gridInfo)
      })
      setBoardInfo(gridArr)
    })
  }

  const clear = () => {
    setBoardInfo([])
    setSuccess(false)
  }
  const back = () => {
    setBoardInfo([...lastBoardInfo])
  }

  useEffect(() => {
    console.log(boardInfo, lastBoardInfo, '====');
  }, [boardInfo, lastBoardInfo])


  const setGrid = (val: Grid, which = 1) => {
    if (val.is) {
      return
    }
    let boardInfoArr = [...boardInfo]
    const gridIndex = boardInfo.findIndex((item) => item === val)
    const grid: Grid = {
      ...boardInfo[gridIndex],
      is: true,
      which
    }
    boardInfoArr.splice(gridIndex, 1, grid)
    setLastBoardInfo(boardInfo)
    setBoardInfo(boardInfoArr)

    if (compute(boardInfoArr, 1, 5)?.sus === true) {
      console.log(compute(boardInfoArr, 1, 5)?.bang, 'arrarrarrarrarrarr');
      compute(boardInfoArr, 1, 5)?.bang.forEach(item => {
        const boardIndex = boardInfoArr.findIndex(e => e.x === item.x && e.y === item.y)
        console.log(boardIndex, 'boardboard==========');

        boardInfoArr.splice(boardIndex, 1, { ...item, success: true })
      })
      console.log(boardInfoArr, 'arrarrarrarrarrarr');

      endGame(boardInfoArr)
    }

  }

  const endGame = (arr: Grid[]) => {
    setTimeout(() => {
      setBoardInfo(arr)
      setSuccess(true)
    }, 500)
  }

  return (
    <div className=" absolute flex-col left-0 right-0 top-0 bottom-0 flex justify-center items-center">
      <h1 className=' text-zinc-50 font-bold text-3xl'>{JSON.stringify(data)}{status}</h1>
      <button
        className='w-40 
        h-16 
        shadow-md 
        rounded-md 
        shadow-blue-500/50 
        bg-cyan-400 
        transition 
        duration-150 
        ease-in-out'
        onClick={() => { sendMsg() }}
      >SEND MSG</button>
      {
        success
        &&
        <h1 className=' text-red-600 font-bold stroke-zinc-200 text-3xl'>段磊获得胜利</h1>
      }
      {
        boardInfo.length === 0
        &&
        <div>
          <p className=' font-medium text-gray-300'>
            棋盘大小
          </p>
          <input
            className=' mr-10'
            type="number"
            value={size}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setSize(Number(e.target.value)) }} />
          <p className=' font-medium text-gray-300'>
            获胜子数
          </p>
          <input
            type="number"
            value={successNum}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setSuccessNum(Number(e.target.value)) }} />
          <p className=' font-medium text-gray-300'>
            发送的消息
          </p>
          <input
            className=''
            value={WSString}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setWSString(e.target.value) }} />
        </div>
      }
      <table className="">
        {
          chunk(boardInfo, size).map((item, d_index) => {
            return (
              <tbody key={d_index} >
                <tr>
                  {
                    item.map((_, r_index) => {
                      return (
                        <td key={r_index}>
                          <div
                            onClick={() => { setGrid(_, 1) }}
                            className='w-10 h-10 bg-yellow-700 text-sm flex justify-center items-center'>
                            {
                              d_index === 0 ?
                                <div className=' absolute h-5 w-0.5 mt-5 bg-cyan-900'></div>
                                :
                                d_index === size - 1 ?
                                  <div className='absolute h-5 w-0.5 mb-5 bg-cyan-900'></div>
                                  :
                                  <div className=' absolute h-10 w-0.5 bg-cyan-900'></div>
                            }
                            {
                              r_index === 0 ?
                                <div className=' absolute h-0.5 w-5 ml-5 bg-cyan-900'></div>
                                :
                                r_index === size - 1 ?
                                  <div className=' absolute h-0.5 w-5 mr-5 bg-cyan-900'></div>
                                  :
                                  <div className=' absolute h-0.5 w-10 bg-cyan-900'></div>
                            }
                            {
                              _.is ?
                                _.success === false ?
                                  _.which === 1 ?
                                    <div className=' w-7 h-7 bg-slate-50 z-10 rounded-full shadow-md'></div>
                                    :
                                    <div className=' w-7 h-7 bg-slate-900 z-10 rounded-full shadow-md'></div>
                                  :
                                  <div className=' w-7 h-7 bg-lime-500 z-10 rounded-full shadow-md'></div>
                                :
                                null
                            }
                          </div>
                        </td>
                      )
                    })
                  }
                </tr>

              </tbody>
            )
          })
        }
      </table>
      <div className=' flex mt-10 justify-between' style={{ "width": 500 }}>
        <button
          className='w-40 
        h-16 
        shadow-md 
        rounded-md 
        shadow-blue-500/50 
        bg-cyan-400 
        transition 
        duration-150 
        ease-in-out'
          onClick={() => { init() }}
        >
          点击开始游戏
        </button>
        <button
          className='w-40 
        h-16 
        shadow-md 
        rounded-md 
        shadow-blue-500/50 
        bg-cyan-400 
        transition 
        duration-150 
        ease-in-out'
          onClick={() => { clear() }}
        >
          清空
        </button>

        <button
          className='w-40 
        h-16 
        shadow-md 
        rounded-md 
        shadow-blue-500/50 
        bg-cyan-400 
        transition 
        duration-150 
        ease-in-out'
          onClick={() => { back() }}
        >
          悔棋
        </button>
      </div>
    </div>
  )
}

