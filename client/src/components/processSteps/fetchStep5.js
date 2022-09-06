import {useState, useRef, useEffect} from 'react';
import './fetchStep5.css';

export default function FetchStep3 (props) {
    const [emailContent,setEmailContent] = useState("");

    function handleChange(e) {
        setEmailContent(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onChosen(emailContent);
    }

    return (<>
            <h3 style={{marginBottom: 0}}>Done!</h3>
            <p>We will notify you if {props.url} changes.</p>
            <input type="button" id="another" value="Make Another Alert!" onClick={props.reset}/>
        </>
   )}