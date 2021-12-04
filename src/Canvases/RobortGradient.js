import * as React from 'react';
import { useGlobalState } from '../globalState';
import { styled } from '@material-ui/core/styles';

const H6 = styled('H6')(({ theme }) => ({
    ...theme.typography.h6,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

export default function RobortGradient() {
    const redGradientRef = React.useRef(null)
    const greenGradientRef = React.useRef(null)
    const blueGradientRef = React.useRef(null)
    const gradientRef = React.useRef(null)
    const [state,] = useGlobalState();
    React.useEffect(() => {
        if (state.imageData.length !== 0) {
            let temp = []
            for (let i = 0; i < state.red.length; i += state.image.width) {
                temp.push(state.red.slice(i, i + state.image.width))
            }
            for (let i = 0; i < state.image.height - 1; i++) {
                for (let j = 0; j < state.image.width - 1; j++) {
                    temp[i][j] = (temp[i][j] - temp[i + 1][j + 1]) + (temp[i][j + 1] - temp[i + 1][j])
                }
            }
            let temp1 = []
            for (let i = 0; i < state.image.height; i++) {
                for (let j = 0; j < state.image.width; j++) {
                    temp1.push(temp[i][j])
                }
            }
            let maxGradiant = Math.max(...temp1)
            let minGradiant = Math.min(...temp1)
            temp1 = temp1.map(i => (i - minGradiant) / (maxGradiant - minGradiant) * 255)
            temp = []
            for (let i = 0; i < temp1.length; i++) {
                temp.push(temp1[i])
                temp.push(0)
                temp.push(0)
                temp.push(state.alpha[i])
            }
            temp = new Uint8ClampedArray(temp)
            redGradientRef.current.width = state.image.width || 400
            redGradientRef.current.height = state.image.height || 400
            let context = redGradientRef.current.getContext('2d')
            let imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)


            temp = []
            for (let i = 0; i < state.green.length; i += state.image.width) {
                temp.push(state.green.slice(i, i + state.image.width))
            }
            for (let i = 0; i < state.image.height - 1; i++) {
                for (let j = 0; j < state.image.width - 1; j++) {
                    temp[i][j] = (temp[i][j] - temp[i + 1][j + 1]) + (temp[i][j + 1] - temp[i + 1][j])
                }
            }
            let temp2 = []
            for (let i = 0; i < state.image.height; i++) {
                for (let j = 0; j < state.image.width; j++) {
                    temp2.push(temp[i][j])
                }
            }
            maxGradiant = Math.max(...temp2)
            minGradiant = Math.min(...temp2)
            temp2 = temp2.map(i => (i - minGradiant) / (maxGradiant - minGradiant) * 255)
            temp = []
            for (let i = 0; i < temp2.length; i++) {
                temp.push(0)
                temp.push(temp2[i])
                temp.push(0)
                temp.push(state.alpha[i])
            }
            temp = new Uint8ClampedArray(temp)
            greenGradientRef.current.width = state.image.width || 400
            greenGradientRef.current.height = state.image.height || 400
            context = greenGradientRef.current.getContext('2d')
            imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)



            temp = []
            for (let i = 0; i < state.blue.length; i += state.image.width) {
                temp.push(state.blue.slice(i, i + state.image.width))
            }
            for (let i = 0; i < state.image.height - 1; i++) {
                for (let j = 0; j < state.image.width - 1; j++) {
                    temp[i][j] = (temp[i][j] - temp[i + 1][j + 1]) + (temp[i][j + 1] - temp[i + 1][j])
                }
            }
            let temp3 = []
            for (let i = 0; i < state.image.height; i++) {
                for (let j = 0; j < state.image.width; j++) {
                    temp3.push(temp[i][j])
                }
            }
            maxGradiant = Math.max(...temp3)
            minGradiant = Math.min(...temp3)
            temp3 = temp3.map(i => (i - minGradiant) / (maxGradiant - minGradiant) * 255)
            temp = []
            for (let i = 0; i < temp3.length; i++) {
                temp.push(0)
                temp.push(0)
                temp.push(temp3[i])
                temp.push(state.alpha[i])
            }
            temp = new Uint8ClampedArray(temp)
            blueGradientRef.current.width = state.image.width || 400
            blueGradientRef.current.height = state.image.height || 400
            context = blueGradientRef.current.getContext('2d')
            imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)


            temp = []
            for (let i = 0; i < temp3.length; i++) {
                temp.push(temp1[i])
                temp.push(temp2[i])
                temp.push(temp3[i])
                temp.push(state.alpha[i])
            }
            temp = new Uint8ClampedArray(temp)
            gradientRef.current.width = state.image.width || 400
            gradientRef.current.height = state.image.height || 400
            context = gradientRef.current.getContext('2d')
            imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)
        }


    }, [state.imageData])
    return (
        <div>
            {state.imageData.length !== 0 ?
                <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-around' }}>
                        <H6>红色通道差分罗伯特梯度</H6>
                        <canvas ref={redGradientRef} />
                    </div>
                    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-around' }}>
                        <H6>绿色通道差分罗伯特梯度</H6>
                        <canvas ref={greenGradientRef} />
                    </div>
                    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-around' }}>
                        <H6>蓝色通道差分罗伯特梯度</H6>
                        <canvas ref={blueGradientRef}></canvas>
                    </div>

                    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-around' }}>
                        <H6>差分罗伯特梯度图</H6>
                        <canvas ref={gradientRef}></canvas>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}
