import * as React from 'react';
import { useGlobalState } from '../globalState';


export default function Channels() {
    const redRef = React.useRef(null)
    const greenRef = React.useRef(null)
    const blueRef = React.useRef(null)
    const [state,] = useGlobalState();
    React.useEffect(() => {
        if (state.imageData.length !== 0) {
            let temp = []
            for (let i = 0; i < state.red.length; i++) {
                temp.push(state.red[i])
                temp.push(0)
                temp.push(0)
                temp.push(state.alpha[i])
            }
            temp = new Uint8ClampedArray(temp)
            redRef.current.width = state.image.width || 400
            redRef.current.height = state.image.height || 400
            let context = redRef.current.getContext('2d')
            let imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)


            temp = []
            for (let i = 0; i < state.green.length; i++) {
                temp.push(0)
                temp.push(state.green[i])
                temp.push(0)
                temp.push(state.alpha[i])
            }
            temp = new Uint8ClampedArray(temp)
            greenRef.current.width = state.image.width || 400
            greenRef.current.height = state.image.height || 400
            context = greenRef.current.getContext('2d')
            imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)


            temp = []
            for (let i = 0; i < state.blue.length; i++) {
                temp.push(0)
                temp.push(0)
                temp.push(state.blue[i])
                temp.push(state.alpha[i])
            }
            temp = new Uint8ClampedArray(temp)
            blueRef.current.width = state.image.width || 400
            blueRef.current.height = state.image.height || 400
            context = blueRef.current.getContext('2d')
            imageData = new ImageData(temp, state.image.width, state.image.height)
            context.putImageData(imageData, 0, 0)
        }


    }, [state.imageData])
    return (
        <div>
            {state.imageData.length !== 0 ?
                <div style={{'display': 'flex','justifyContent':'space-around'}}>
                    <div>
                        <p>红色通道</p>
                        <canvas ref={redRef} />
                    </div>
                    <div>
                        <p>绿色通道</p>
                        <canvas ref={greenRef} />
                    </div>
                    <div>
                        <p>蓝色通道</p>
                        <canvas ref={blueRef}></canvas>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}
