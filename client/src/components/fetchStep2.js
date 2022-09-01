import {useState, useRef, useEffect} from 'react';
import './fetchStep2.css';

export default function FetchStep1 (props) {
    let url = props.url;

    // const [needsReload,setNeedsReload] = useState();

    async function fetchFrame() {
        const urlMatcher = /(https?:\/\/[^/]*)\//;
        //Can we react-refactor this?
        if (url[url.length-1] != '/') {
            url += '/'; //temporary
        }

        document.cookie = "targetPage="+url+"; SameSite=None; Secure";
        document.cookie = "targetDomain="+url.match(urlMatcher)[1]+"; SameSite=None; Secure";
    }

      useEffect(() => {fetchFrame()},[]);

      return (
            <MyFrame id="elementPickFrame" src='./proxyPage' clickEvent={props.onChosen}/>
      ) 
}

function MyFrame(props) {
    let theFrame = useRef(null);

    function handleLoad() {
        let css = '.blue {background-color: blue !important; background-image:none !important;}';
        let style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
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
        //console.log(event.target);

        if (typeof theFrame.current.contentDocument.body.previous !== 'undefined') {
            theFrame.current.contentDocument.body.previous.classList.remove('blue');
        } 
        event.target.classList.add('blue');
        theFrame.current.contentDocument.body.previous = event.target;
    }

    function mouseOut(event) {
        event.target.classList.remove('blue');
    }

    function handleClick(event) {
        event.preventDefault();
        removeListeners();
        props.clickEvent(theFrame.current.contentDocument.body.previous);
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

    return <iframe ref={theFrame} id={props.id} src={props.src} onLoad={handleLoad} />;
}
