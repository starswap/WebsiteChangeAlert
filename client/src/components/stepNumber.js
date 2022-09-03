import {useRef, useEffect} from 'react';
import './stepNumber.css';

export default function StepNumber (props) {
    const canvasRef = useRef(null);

    function drawNumberCircle() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.beginPath();
        context.arc(canvas.width/2, canvas.height/2, 30, 0, 2 * Math.PI, false);
        context.lineWidth = 3;
        context.strokeStyle = '#000000';
        context.stroke();
        
        context.font = "40px Segoe UI";
        context.fillText(props.num.toString(), canvas.width/2, canvas.height/2);

      }

    useEffect(drawNumberCircle, [props.num]); //On first render only.
          
      return (
        <>
          <canvas ref={canvasRef} width={300} height={100}></canvas>
        </>
      ) 


}
