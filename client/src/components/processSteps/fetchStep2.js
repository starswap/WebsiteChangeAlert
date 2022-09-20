import {useRef, useEffect, useState } from 'react';
import './fetchStep2.css';

const hoverClassName = 'blue';

export default function FetchStep2 (props) {
    let url = props.url;

    //On first render we need to reload the iframe with the correct proxied URL.
      useEffect(() => {
        const urlMatcher = /(https?:\/\/[^/]*)\//;
        //Can we react-refactor this?

        document.cookie = "targetPage="+url+"; SameSite=None; Secure";
        document.cookie = "targetDomain="+url.match(urlMatcher)[1]+"; SameSite=None; Secure";

      },[url]);

      return (
        <>
            <h3><i>Right Click</i> on the element to scan for changes to.</h3> 
            <MyFrame id="elementPickFrame" src='./proxyPage' clickEvent={props.onChosen}/>
        </>
      ) 
}

function LoadIndicator(props) {

    const canvasRef = useRef(null);
    const [startAngle,setStartAngle] = useState(0);

    function drawNumberCircle() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height);
        

        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.setLineDash([5,3]);


        context.beginPath();
        context.arc(canvas.width/2, canvas.height/2, 30, startAngle, startAngle+2 * Math.PI, false);
        context.lineWidth = 3;
        context.stroke();
        
        context.font = "40px Segoe UI";
    }


    const timeInterval = 50;
    const angleDelta = 0.05;
    useEffect(() => {
        let interval = setInterval(
            () => {setStartAngle((prevAngle => prevAngle+angleDelta))}
        ,timeInterval);
        
        return () => {clearInterval(interval)};
    },[]);

    useEffect(drawNumberCircle, [startAngle]); //On first render only.


    return (<div style={{display: (props.hidden) ? "none" : "block"}} id="frameLoadPlaceholder">
        <div id="spacerTop"></div>
            <canvas ref={canvasRef} height={100}></canvas>
            <p>Just loading that page for you; hold on tight.</p>
            <div className="spacer"></div>
            <a href="https://xkcd.com/612/"><img style={{height:250}} src="https://imgs.xkcd.com/comics/estimation.png" alt="An XKCD comic about progress estimation; LICENCE: https://creativecommons.org/licenses/by-nc/2.0/legalcode"/></a>
            <p>(Courtesy of <a id="xkcdLink" href="https://xkcd.com/612/">XKCD</a>)</p>
            <div className="spacer"></div>
        </div>)
}


function MyFrame(props) {
    let theFrame = useRef(null);
    const [loadHidden,setLoadHidden] = useState(false);
    const [frameHidden,setFrameHidden] = useState(true);

    function handleLoad() {
        setLoadHidden(true);
        setFrameHidden(false);

        let hoverClassCSS = '.blue {background-color: blue !important; background-image:none !important;}';
        let style = document.createElement('style');
        style.appendChild(document.createTextNode(hoverClassCSS));
        theFrame.current.contentDocument.head.appendChild(style);
        theFrame.current.contentDocument.querySelectorAll('*').forEach( (item) =>
            item.addEventListener('mouseover', mouseIn)
        );
        theFrame.current.contentDocument.querySelectorAll('*').forEach( (item) =>
            item.addEventListener('mouseout', mouseOut)
        );
        // theFrame.current.contentDocument.querySelectorAll('*').forEach( (item) => {
        //     item.onclick = false; //remove any existing onclicks
        // });        
        theFrame.current.contentDocument.addEventListener('contextmenu',handleClick);
    }

    function mouseIn(event) {
        if (typeof theFrame.current.contentDocument.body.previous !== 'undefined') {
            theFrame.current.contentDocument.body.previous.classList.remove(hoverClassName);
        }
        event.target.classList.add(hoverClassName);
        theFrame.current.contentDocument.body.previous = event.target;
    }

    function mouseOut(event) {
        event.target.classList.remove(hoverClassName);
    }

    function handleClick(event) {
        event.preventDefault();
        removeListeners();
        let theObject = theFrame.current.contentDocument.body.previous;
        theObject.classList.remove(hoverClassName);
        props.clickEvent(theObject);
        return false;
    }


    function removeListeners() {
        theFrame.current.contentDocument.querySelectorAll('*').forEach( (item) =>
            item.removeEventListener('mouseover', mouseIn)
        );
        theFrame.current.contentDocument.querySelectorAll('*').forEach( (item) =>
            item.removeEventListener('mouseout', mouseOut)
        );
        theFrame.current.contentDocument.removeEventListener('click', handleClick);     
    }

    //return <div height={100} width={200}></div>
    return (
        <>
            <LoadIndicator hidden={loadHidden}/>
            <iframe title="Select an element to track." ref={theFrame} id={props.id} src={props.src} onLoad={handleLoad} hidden={frameHidden}/>
        </>
    );
}
