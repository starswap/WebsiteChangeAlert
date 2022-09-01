import {useState, useRef, useEffect} from 'react';
import './fetchStep1.css';

export default function FetchStep1 () {

    let [url, setUrl] = useState("https://latinvocabularytester.com/");
    const [needsReload,setNeedsReload] = useState(false);

    const frame = useRef(null);

    async function fetchFrame(e) {
        e.preventDefault();
        const urlMatcher = /(https?:\/\/[^/]*)\//;
        //Can we react-refactor this?
        if (url[url.length-1] != '/') {
            url += '/'; //temporary
        }

        document.cookie = "targetPage="+url+"; SameSite=None; Secure";
        document.cookie = "targetDomain="+url.match(urlMatcher)[1]+"; SameSite=None; Secure";
        setNeedsReload( (val) => !val);
      }

      function handleChange(e) {
        setUrl(e.target.value);
      }

      return (
        <form onSubmit={fetchFrame}>
            <input id="url" type="text" value={url} onChange={handleChange} /> 
            <input type="submit" value="Fetch!"/> <br />
            <MyFrame ref={frame} id="elementPickFrame" src='./proxyPage' needsReload={needsReload}/>
        </form>
      ) 
      
}

function MyFrame(props) {
    let theFrame = useRef(null);

    //allow parent to reload the frame.
    useEffect( () => { 
        if (theFrame.current !== null) {
            theFrame.current.contentWindow.location.reload();
        }
    },[props.needsReload]);

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
        theFrame.current.contentDocument.querySelectorAll('*').forEach( (item) =>
            item.addEventListener('click', handleClick)
        );        
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
        alert(theFrame.current.contentDocument.body.previous);
    }

    return <iframe ref={theFrame} id={props.id} src={props.src} onLoad={handleLoad} />;
}
