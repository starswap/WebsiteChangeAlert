import {useState, useRef, useEffect} from 'react';
import './fetchStep4.css';

export default function FetchStep3 (props) {
    const [emailContent,setEmailContent] = useState("");

    function handleChange(e) {
        setEmailContent(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onChosen(emailContent);
    }

    return (<form onSubmit={handleSubmit}>
        <textarea name='emailContent' id='emailContent' placeholder="Email Content Goes Here!" value={emailContent} onChange={handleChange}/>
        <input type='submit' name='submit' id='submit' text='Next >' />
    </form>)
}
