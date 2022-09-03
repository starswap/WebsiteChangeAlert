import {useState, useRef, useEffect} from 'react';
import './fetchStep2.css';

const hoverClassName = 'blue';

export default function FetchStep2 (props) {
    let url = props.url;

    // const [needsReload,setNeedsReload] = useState();

    async function fetchFrame() {
        const urlMatcher = /(https?:\/\/[^/]*)\//;
        //Can we react-refactor this?

        document.cookie = "targetPage="+url+"; SameSite=None; Secure";
        document.cookie = "targetDomain="+url.match(urlMatcher)[1]+"; SameSite=None; Secure";
    }

      useEffect(() => {fetchFrame()},[]);

      return (
        <>
            <h3>Click on the element to scan for changes to.</h3> 
            <MyFrame id="elementPickFrame" src='./proxyPage' clickEvent={props.onChosen}/>
        </>
      ) 
}

function MyFrame(props) {
    let theFrame = useRef(null);

    function handleLoad() {
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
        theFrame.current.contentDocument.addEventListener('click', handleClick);        
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
    return <iframe ref={theFrame} id={props.id} src={props.src} onLoad={handleLoad} />;
}
