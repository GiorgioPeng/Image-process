import * as React from 'react';
import { useGlobalState } from '../globalState';

import { styled } from '@material-ui/core/styles';

const H6 = styled('H6')(({ theme }) => ({
    ...theme.typography.h6,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

export default function Channels() {
    const objectRef = React.useRef(null)
    const backgroundRef = React.useRef(null)
    const [state,] = useGlobalState();
    const calcGas = (u, sigma, x) => {
        sigma += 1e-9
        return (1 / Math.pow((2 * Math.PI * sigma),0.5) * Math.exp(-Math.pow((x - u), 2) / (2 * sigma)))
    }
    const calcKL = (t, hist) => {
        // console.log(hist)

        let e = 1e-9
        let p0t = 0
        for (let i = 0; i < t; i++) {
            p0t += hist[i]
        }
        let pbt = 1 - p0t
        let kl = 0
        let u0t = 0
        let ubt = 0
        let sigma0t = 0
        let sigmabt = 0
        let left = hist.map(i => i / (p0t + e)).slice(0, t)
        let right = hist.map(i => i / (pbt + e)).slice(t,)
        // console.log(pbt,right)

        for (let i = 0; i < t; i++) {
            u0t += i * left[i]
        }
        for (let i = t; i < 256; i++) {
            ubt += i * right[i-t]
        }

        for (let i = 0; i < t; i++) {
            sigma0t += Math.pow((i - u0t), 2) * left[i]
        }
        for (let i = t; i <256; i++) {
            sigmabt += Math.pow((i - ubt), 2) * right[i-t]
        }

        let ptg

        for (let i = 0; i < 256; i++) {
            ptg = p0t * calcGas(u0t, sigma0t, i) + pbt * calcGas(ubt, sigmabt, i) + e
            kl += hist[i] * Math.log(hist[i] / ptg + e)
            
        }
        
        // console.log(Math.PI ,(Math.pow((2 * Math.PI * sigma0t),2)))
        // console.log(kl)
        return kl
    }
    React.useEffect(() => {
        if (state.imageData.length !== 0) {
            let originPositionArr = []
            let grayArr = []
            let grayObj = {}
            for (let i = 0; i < state.red.length; i++) {
                let tempValue = parseInt(state.red[i] * 0.3 + state.green[i] * 0.59 + state.blue[i] * 0.11)
                if(isNaN(tempValue)){
                    continue
                }
                originPositionArr.push(tempValue)
                grayObj[tempValue] ? grayObj[tempValue]++ : grayObj[tempValue] = 1
            }
            let totalSize = 0
            Object.keys(grayObj).forEach(key => {
                totalSize += grayObj[key]
            })

            // console.log(grayObj,totalSize)
            for (let i = 0; i < 256; i++) {
                grayArr.push(grayObj[i] ? parseFloat(grayObj[i]) / parseFloat(totalSize) : 0)
            }
            // console.log(grayArr)
            let minKl = 1000000
            let threshold = 0
            for (let i = 0; i < 256; i++) {
                let kl = calcKL(i, grayArr)
                // console.log(kl)
                if (minKl > kl) {
                    minKl = kl
                    threshold = i
                }
            }
            // console.log(threshold)
            let objectRed = [];
            let objectGreen = [];
            let objectBlue = [];
            
            let bgRed = [];
            let bgGreen = [];
            let bgBlue = [];
            
            originPositionArr.forEach((i,index)=>{
                if(i<threshold) {
                    objectRed.push(0)
                    objectGreen.push(0)
                    objectBlue.push(0)

                    bgRed.push(255)
                    bgGreen.push(255)
                    bgBlue.push(255)
                }
                else{
                    objectRed.push(255)
                    objectGreen.push(255)
                    objectBlue.push(255)

                    bgRed.push(0)
                    bgGreen.push(0)
                    bgBlue.push(0)
                }
            })

            let temp = []
            for (let i = 0; i < state.blue.length; i++) {
                temp.push(objectRed[i])
                temp.push(objectGreen[i])
                temp.push(objectBlue[i])
                temp.push(state.alpha[i])
            }
            // console.log(temp)

            temp = new Uint8ClampedArray(temp)
            objectRef.current.width = state.image.width || 400
            objectRef.current.height = state.image.height || 400
            let context = objectRef.current.getContext('2d')
            let imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)




            temp = []
            for (let i = 0; i < state.blue.length; i++) {
                temp.push(bgRed[i])
                temp.push(bgGreen[i])
                temp.push(bgBlue[i])
                temp.push(state.alpha[i])
            }

            temp = new Uint8ClampedArray(temp)
            backgroundRef.current.width = state.image.width || 400
            backgroundRef.current.height = state.image.height || 400
            context = backgroundRef.current.getContext('2d')
            imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)
        }


    }, [state.imageData])
    return (
        <div>
            {state.imageData.length !== 0 ?
                <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-around' }}>
                        <H6>灰度直方图双峰混合高斯下背景|前景</H6>
                        <canvas ref={backgroundRef} />
                    </div>
                    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-around' }}>
                        <H6>灰度直方图双峰混合高斯下前景|背景</H6>
                        <canvas ref={objectRef} />
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}
