import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useGlobalState } from '../globalState';

const Input = styled('input')({
    display: 'none',
});
const H1 = styled('H1')(({ theme }) => ({
    ...theme.typography.h1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));
  

export default function UploadButtons() {
    const [state, updateState,] = useGlobalState();
    const imgRef = React.useRef(null)
    const canvasRef = React.useRef(null)
    const upload = (event) => {
        updateState('imageSrc', URL.createObjectURL(event.currentTarget.files[0]))
    }
    const draw = ()=>{
        canvasRef.current.width = imgRef.current.width || 400
        canvasRef.current.height = imgRef.current.height || 400
        const content = canvasRef.current.getContext('2d')
        content.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        content.drawImage(imgRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        imgRef.current.style.display = 'none'
        const data = content.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        updateState('image',data)
        updateState('imageData',data.data)
        const red = []
        const green = []
        const blue = []
        const alpha = []
        for(let i = 0;i<data.data.length;i+=4){
            red.push(data.data[i])
            green.push(data.data[i+1])
            blue.push(data.data[i+2])
            alpha.push(data.data[i+3])
        }
        updateState('red',red)
        updateState('green',green)
        updateState('blue',blue)
        updateState('alpha',alpha)
    }
    return (
        <div style={{'margin':'20vh auto', 'display': 'flex','alignItems':'center','flexDirection':'column'}}>
            <H1>Upload is all you need.</H1>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={upload} />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            <img src={state.imageSrc} ref={imgRef} style={{ 'maxWidth': '400px' }} onLoad={draw}/>
            <canvas ref={canvasRef} />
        </div>
    );
}
