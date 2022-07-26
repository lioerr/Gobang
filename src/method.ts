import { chunk, concat, sortBy, keyBy, orderBy, groupBy, LoDashExplicitStringWrapper, LoDashExplicitArrayWrapper, LoDashExplicitNillableArrayWrapper, LoDashImplicitNumberArrayWrapper, LoDashExplicitNumberArrayWrapper, size, } from "lodash";

export function compute(arr: Grid[], which: number, susNum: number):{sus:boolean, bang: Grid[]} | undefined {
    const arr_1 = arr.filter(item => {
        if(item.is && item.which === which){
            return item
        }
    })
    const arr_2:Grid[][] = chunk(arr,Math.sqrt(arr.length))
    let slashX:{[propName: string]:Grid[]} = {}
    let slashY:{[propName: string]:Grid[]} = {}

    let arr_test_1,
        arr_test_2,
        arr_test_3,
        arr_test_4: Grid[] = []
    for(let slashIndex = 0; slashIndex < arr_2.length; slashIndex++){
        arr_test_1 = []
        arr_test_2 = []
        arr_test_3 = []
        arr_test_4 = []
        for(let i = 0; i< arr_2.length; i++){
            let i_x = i
            let i_y = i+slashIndex
            let r_x = i
            let r_y = arr_2.length-slashIndex-i
            let r_y_1 = arr_2.length-i-1
            if(i_y>=0 && i_y<=arr_2.length-1 ){
                arr_test_1.push(arr_2[i_x][i_y])
            }
            if(i_y>=0 && i_y<=arr_2.length-1){
                arr_test_2.push(arr_2[i_y][i_x])
            }
            if(r_y>=0 && r_y<=arr_2.length-1){
                arr_test_3.push(arr_2[r_x][r_y])
            }
            if(i_y>=0 && i_y<arr_2.length){
                arr_test_4.push(arr_2[i_y][r_y_1])
            }
        }
        isIS(arr_test_1,susNum) ? slashX[`${slashIndex}_x`] = arr_test_1.filter(i => i.is) : null
        isIS(arr_test_2,susNum) ? slashX[`${slashIndex}_y`] = arr_test_2.filter(i => i.is) : null
        isIS(arr_test_3,susNum) ? slashY[`${slashIndex}_rx`] = arr_test_3.filter(i => i.is) : null
        isIS(arr_test_4,susNum) ? slashY[`${slashIndex}_ry`] = arr_test_4.filter(i => i.is) : null
    }
    console.log(slashX,'slashXslashX');

    
    

    const resultY = groupBy(orderBy(sortBy(arr_1, function(o) {return o.x}), ['y'], ['asc']), (val) => val.x);
    const resultX = groupBy(orderBy(sortBy(arr_1, function(o) {return o.y}), ['x'], ['asc']), (val) => val.y);
    
    return [
        computeX(resultX, susNum),
        computeY(resultY, susNum),
        computeSlashX(slashX, susNum),
        computeSlashY(slashY, susNum)
    ]
    .find(i => i.sus)
}

const computeY = (arr: object,susNum: number): {sus:boolean, bang: Grid[]} => {
    let susArr: Grid[] = []
    return {
        sus: Object.values(arr).some((item: Grid[]) => {
            let currentNum = 0
            if(item.length>=susNum){
                for(let i = 0; i <= item.length; i++){
                    susArr.push(item[i])
                    if(i === 0){
                        continue
                    }
                    if(item[i].y === item[i-1]?.y+1){
                        currentNum += 1
                        console.log(currentNum,'currentNum');
                        if(currentNum === susNum-1){
                            break
                        }
                    }else{
                        susArr = []
                        break
                    }
                }
                return currentNum === susNum-1
            }
        }),
        bang: susArr
    }
}

const computeX = (arr: object,susNum: number) => {
    let susArr: Grid[] = []
    return {
        sus: Object.values(arr).some((item: Grid[]) => {
            let currentNum = 0
            if(item.length>=susNum){
                for(let i = 0; i <= item.length; i++){
                    susArr.push(item[i])
                    if(i === 0){
                        continue
                    }
                    if(item[i].x === item[i-1]?.x+1){
                        currentNum += 1
                        console.log(currentNum,'currentNum');
                        if(currentNum === susNum-1){
                            break
                        }
                    }else{
                        susArr = []
                        break
                    }
                }
                return currentNum === susNum-1
            }
        }),
        bang: susArr
    }
}

const computeSlashX = (slashArr: object,susNum: number) => {
    let susArr: Grid[] = []
    console.log(slashArr,'slashArrslashArrXXXXXXXXXX');
    
    return {
        sus:Object.values(slashArr).some(item=>{
            let currentNum = 0
            if(item.length>=susNum){
                for(let i = 0; i <= item.length; i++){
                    if(i === 0){
                        continue
                    }
                    if(item[i]?.x === item[i-1]?.x+1 && item[i].y === item[i-1]?.y+1){
                        currentNum += 1
                        if(currentNum === susNum-1){
                            for(let index = i; index > i-5; index--){
                                susArr.push(item[index])
                            }
                            break
                        }
                    }else{
                        susArr = []
                        currentNum = 0
                    }
                }
                return currentNum === susNum-1
            }
        }),
        bang: susArr
    }
}

const computeSlashY = (slashArr: object,susNum: number) => {
    let susArr: Grid[] = []
    console.log(slashArr,'slashArrslashArrTYYYYYYYYYYYY');
    return {
        sus:Object.values(slashArr).some(item=>{
            let currentNum = 0
            if(item.length>=susNum){
                for(let i = 0; i <= item.length; i++){
                    
                    if(i === 0){
                        continue
                    }
                    if(item[i]?.x === item[i-1]?.x+1 && item[i].y === item[i-1]?.y-1){
                        currentNum += 1
                        console.log(currentNum,'currentNum');
                        if(currentNum === susNum-1){
                            for(let index = i; index > i-5; index--){
                                susArr.push(item[index])
                            }
                            break
                        }
                    }else{
                        susArr = []
                        currentNum = 0
                    }
                }
                return currentNum === susNum-1
            }
        }),
        bang: susArr
    }
}


const isIS = (arr: Grid[], len:number) => {
    if(arr.length >= len && arr.filter(i => i.is).length >= len) {
        return true
    } else {
        return false
    }
}

//将数组进行分组，一行为一组



//判断每组的is为true的元素是否大于等于5

//对数组进行升序排序

//计算数组的元素是否有规律