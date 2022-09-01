import {useState, useRef} from 'react';
import './fetchStep1.css';


export default function FetchStep1 () {

    let [url, setUrl] = useState("https://latinvocabularytester.com/");
    const frame = useRef(null);

    async function fetchFrame() {
        console.log("Called");
        const urlMatcher = /(https?:\/\/[^/]*)\//;

        document.cookie = "targetPage="+url+"; SameSite=None; Secure";
        document.cookie = "targetDomain="+url.match(urlMatcher)[1]+"; SameSite=None; Secure";
        frame.current.contentWindow.location.reload(); //forces update
      
        // document.querySelectorAll('*').forEach(item => {
        //   item.addEventListener('click', event => {
        //     alert("You clicked me")
        //   })
        // })  
      }

      function handleChange(e) {
        setUrl(e.target.value);
      }

      return (
        <>
            <input id="url" type="text" value={url} onChange={handleChange} />
            <input type="button" onClick={fetchFrame} value="Fetch!"/>
            <iframe ref={frame} id="elementPickFrame" src='./proxyPage' />
        </>
      ) 
      
}
