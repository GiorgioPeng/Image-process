function fftFunction(dataArray) {
    // 复数乘法
    this.mul = function(a, b) {
        if(typeof(a)!=='object') {
            a = {real: a, imag: 0}
        }
        if(typeof(b)!=='object') {
            b = {real: b, imag: 0}
        }
        return {
            real: a.real*b.real-a.imag*b.imag,
            imag: a.real*b.imag+a.imag*b.real
        };
    };

    // 复数加法
    this.add = function(a, b) {
        if(typeof(a)!=='object') {
            a = {real: a, imag: 0}
        }
        if(typeof(b)!=='object') {
            b = {real: b, imag: 0}
        }
        return {
            real: a.real+b.real,
            imag: a.imag+b.imag
        };
    };

    // 复数减法
    this.sub = function(a, b) {
        if(typeof(a)!=='object') {
            a = {real: a, imag: 0}
        }
        if(typeof(b)!=='object') {
            b = {real: b, imag: 0}
        }
        return {
            real: a.real-b.real,
            imag: a.imag-b.imag
        };
    };

    // 倒位序排列
    this.sort = function(data, r) {
        if(data.length <=2) {
            return data;
        }
        let index = [0,1];
        for(let i=0; i<r-1; i++) {
            let tempIndex = [];
            for(let j=0; j<index.length; j++) {
                tempIndex[j] = index[j]*2;
                tempIndex[j+index.length] = index[j]*2+1;
            }
            index = tempIndex;
        }
        let datatemp = [];
        for(let i=0; i<index.length; i++) {
            datatemp.push(data[index[i]]);
        }
        return datatemp;
    };

    let dataLen = dataArray.length;
    let r = 1; // 迭代次数
    let i = 1;
    while(i*2 < dataLen) {
        i *= 2;
        r++;
    }
    let count = 1<<r; // 相当于count=2^r

    // 如果数据dataArray的长度不是2^N，则开始补0
    for(let i=dataLen; i<count; i++) {
        dataArray[i] = 0;
    }

    // 倒位序处理
    dataArray = this.sort(dataArray, r);

    // 计算加权系数w
    let w = [];
    for(let i=0; i<count/2; i++) {
        let angle = -i*Math.PI*2/count;
        w.push({real: Math.cos(angle), imag: Math.sin(angle)});
    }

    for(let i=0; i<r; i++) { // 级循环
        let group = 1<<(r-1-i);
        let distance = 1<<i;
        let unit = 1<<i;
        for(let j=0; j<group; j++) { // 组循环
            let step = 2*distance*j;
            for(let k=0; k<unit; k++) { // 计算单元循环
                let temp = this.mul(dataArray[step+k+distance], w[count*k/2/distance]);
                dataArray[step+k+distance] = this.sub(dataArray[step+k], temp);
                dataArray[step+k] = this.add(dataArray[step+k], temp);
            }
        }
    }
    return dataArray;
}
export default fftFunction;