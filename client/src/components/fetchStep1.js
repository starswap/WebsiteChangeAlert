import {useState, useRef} from 'react';
import './fetchStep1.css';

export default function FetchStep1 () {

    const [url, setUrl] = useState("https://latinvocabularytester.com/");

    const frame = useRef(null);

    async function fetchFrame() {
        console.log("Called");
        const urlMatcher = /(https?:\/\/[^/]*)\//;

        //Can we react-refactor this?

        document.cookie = "targetPage="+url+"; SameSite=None; Secure";
        document.cookie = "targetDomain="+url.match(urlMatcher)[1]+"; SameSite=None; Secure";
        frame.current.contentWindow.location.reload(); //forces update
      }

      function handleLoad() {
        var css = '.blue {background-color: blue !important; background-image:none !important;}'
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        frame.current.contentDocument.head.appendChild(style);
        frame.current.contentDocument.querySelectorAll('*').forEach(mouseIn);
        frame.current.contentDocument.querySelectorAll('*').forEach(mouseOut);
      }

      function mouseIn(item) {
        item.addEventListener('mouseover', event => {
            console.log(event.target);

            if (typeof  frame.current.contentDocument.body.previous !== 'undefined') {
                frame.current.contentDocument.body.previous.classList.remove('blue');
            } 
            event.target.classList.add('blue');
            frame.current.contentDocument.body.previous = event.target;
        })
      }

      function mouseOut(item) {
        item.addEventListener('mouseout', event => {
            event.target.classList.remove('blue');
        })
      }


      function handleChange(e) {
        setUrl(e.target.value);
      }

      return (
        <>
            <input id="url" type="text" value={url} onChange={handleChange} />
            <input type="button" onClick={fetchFrame} value="Fetch!"/>
            <iframe ref={frame} id="elementPickFrame" src='./proxyPage' onLoad={handleLoad}/>
        </>
      ) 
      
}
