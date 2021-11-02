import * as React from 'react';
import { useGlobalState } from '../globalState';
import fftFunction from '../utils/fft';

export default function Fourier() {
    const redFourierRef = React.useRef(null)
    const greenFourierRef = React.useRef(null)
    const blueFourierRef = React.useRef(null)
    const FourierRef = React.useRef(null)
    const [state,] = useGlobalState();

    function fft2(dataArray, width, height) {
        // const fft = new fftFunction(dataArray)
        let r = 1;
        let i = 1;
        while (i * 2 < width) {
            i *= 2;
            r++;
        }
        let width2 = 1 << r;
        r = 1;
        i = 1;
        while (i * 2 < height) {
            i *= 2;
            r++;
        }
        let height2 = 1 << r;

        let dataArrayTemp = [];
        for (let i = 0; i < height2; i++) {
            for (let j = 0; j < width2; j++) {
                if (i >= height || j >= width) {
                    dataArrayTemp.push(0);
                }
                else {
                    dataArrayTemp.push(dataArray[i * width + j]);
                }
            }
        }

        dataArray = dataArrayTemp;
        width = width2;
        height = height2;

        let dataTemp = [];
        let dataArray2 = [];
        for (let i = 0; i < height; i++) {
            dataTemp = [];
            for (let j = 0; j < width; j++) {
                dataTemp.push(dataArray[i * width + j]);
            }
            dataTemp = new fftFunction(dataTemp);
            for (let j = 0; j < width; j++) {
                dataArray2.push(dataTemp[j]);
            }
        }
        dataArray = dataArray2;
        dataArray2 = [];
        for (let i = 0; i < width; i++) {
            let dataTemp = [];
            for (let j = 0; j < height; j++) {
                dataTemp.push(dataArray[j * width + i]);
            }
            dataTemp = new fftFunction(dataTemp);
            for (let j = 0; j < height; j++) {
                dataArray2.push(dataTemp[j]);
            }
        }
        dataArray = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                dataArray[j * height + i] = dataArray2[i * width + j];
            }
        }
        return dataArray;
    }

    React.useEffect(() => {

        if (state.imageData.length !== 0) {
            let temp = []
            for (let i = 0; i < state.red.length; i += state.image.width) {
                temp.push(state.red.slice(i, i + state.image.width))
            }
            console.log(temp)
            temp = fft2(temp,state.image.width,state.image.height)
            console.log(temp)
            // for (let i = 0; i < state.image.height - 1; i++) {
            //     for (let j = 0; j < state.image.width - 1; j++) {
            //         temp[i][j] = (temp[i][j] - temp[i + 1][j]) + (temp[i][j] - temp[i][j + 1])
            //     }
            // }
            let temp1 = []
            for (let i = 0; i < state.image.height; i++) {
                for (let j = 0; j < state.image.width; j++) {
                    temp1.push(temp[i][j])
                }
            }
            // let maxGradiant = Math.max(...temp1)
            // let minGradiant = Math.min(...temp1)
            // temp1 = temp1.map(i => (i - minGradiant) / (maxGradiant - minGradiant) * 255)
            temp = []
            for (let i = 0; i < temp1.length; i++) {
                temp.push(temp1[i])
                temp.push(0)
                temp.push(0)
                temp.push(state.alpha[i])
            }


            temp = new Uint8ClampedArray(temp)
            let context = redFourierRef.current.getContext('2d')
            let imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)


            // temp = []
            // for (let i = 0; i < state.green.length; i += state.image.width) {
            //     temp.push(state.green.slice(i, i + state.image.width))
            // }
            // for (let i = 0; i < state.image.height - 1; i++) {
            //     for (let j = 0; j < state.image.width - 1; j++) {
            //         temp[i][j] = (temp[i][j] - temp[i + 1][j]) + (temp[i][j] - temp[i][j + 1])
            //     }
            // }
            // let temp2 = []
            // for (let i = 0; i < state.image.height; i++) {
            //     for (let j = 0; j < state.image.width; j++) {
            //         temp2.push(temp[i][j])
            //     }
            // }
            // maxGradiant = Math.max(...temp2)
            // minGradiant = Math.min(...temp2)
            // temp2 = temp2.map(i => (i - minGradiant) / (maxGradiant - minGradiant) * 255)
            // temp = []
            // for (let i = 0; i < temp2.length; i++) {
            //     temp.push(0)
            //     temp.push(temp2[i])
            //     temp.push(0)
            //     temp.push(state.alpha[i])
            // }
            // temp = new Uint8ClampedArray(temp)
            // context = greenFourierRef.current.getContext('2d')
            // imageData = new ImageData(temp, state.image.width, state.image.height)
            // context.putImageData(imageData, 0, 0)



            // temp = []
            // for (let i = 0; i < state.blue.length; i += state.image.width) {
            //     temp.push(state.blue.slice(i, i + state.image.width))
            // }
            // for (let i = 0; i < state.image.height - 1; i++) {
            //     for (let j = 0; j < state.image.width - 1; j++) {
            //         temp[i][j] = (temp[i][j] - temp[i + 1][j]) + (temp[i][j] - temp[i][j + 1])
            //     }
            // }
            // let temp3 = []
            // for (let i = 0; i < state.image.height; i++) {
            //     for (let j = 0; j < state.image.width; j++) {
            //         temp3.push(temp[i][j])
            //     }
            // }
            // maxGradiant = Math.max(...temp3)
            // minGradiant = Math.min(...temp3)
            // temp3 = temp3.map(i => (i - minGradiant) / (maxGradiant - minGradiant) * 255)
            // temp = []
            // for (let i = 0; i < temp3.length; i++) {
            //     temp.push(0)
            //     temp.push(0)
            //     temp.push(temp3[i])
            //     temp.push(state.alpha[i])
            // }
            // temp = new Uint8ClampedArray(temp)
            // context = blueFourierRef.current.getContext('2d')
            // imageData = new ImageData(temp, state.image.width, state.image.height)
            // context.putImageData(imageData, 0, 0)


            // temp = []
            // for (let i = 0; i < temp3.length; i++) {
            //     temp.push(temp1[i])
            //     temp.push(temp2[i])
            //     temp.push(temp3[i])
            //     temp.push(state.alpha[i])
            // }
            // console.log(temp)
            // temp = new Uint8ClampedArray(temp)
            // context = FourierRef.current.getContext('2d')
            // imageData = new ImageData(temp, state.image.width, state.image.height)
            // context.putImageData(imageData, 0, 0)
        }


    }, [state.imageData])
    return (
        <div>
            {state.imageData.length !== 0 ?
                <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                    <div>
                        <p>红色通道差分梯度</p>
                        <canvas ref={redFourierRef} />
                    </div>
                    <div>
                        <p>绿色通道差分梯度</p>
                        <canvas ref={greenFourierRef} />
                    </div>
                    <div>
                        <p>蓝色通道差分梯度</p>
                        <canvas ref={blueFourierRef}></canvas>
                    </div>

                    <div>
                        <p>差分梯度图</p>
                        <canvas ref={FourierRef}></canvas>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}
