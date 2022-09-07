import {useState} from 'react';
import './fetchStep4.css';

export default function FetchStep4 (props) {
    const [emailContent,setEmailContent] = useState("");

    function handleChange(e) {
        setEmailContent(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onChosen(emailContent);
    }

    return (
        <>
            <h3>Enter the content of the email to send.</h3> 

            <form onSubmit={handleSubmit} autoComplete="off">
                <textarea name='emailContent' id='emailContent' placeholder="Email Content Goes Here!" value={emailContent} onChange={handleChange}/> <br />
                <input type='submit' name='submit' id='submitContent' text='Next >' />
            </form>
        </>
    )
}
