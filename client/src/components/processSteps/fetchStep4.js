import {useState} from 'react';
import './fetchStep4.css';

export default function FetchStep4 (props) {
    const [emailContent,setEmailContent] = useState("");
    const [emailSubject,setEmailSubject] = useState("");

    function handleChange(e) {
        setEmailContent(e.target.value);
    }

    function handleChangeToSubject(e) {
        setEmailSubject(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onChosen(emailSubject,emailContent);
    }

    return (
        <>
            <h3>Enter the subject and content of the email alert to send.</h3> 

            <form onSubmit={handleSubmit} autoComplete="off">

                <div id="emailContainer">
                    <input type='text' name='subjectLine' id='subjectLine' placeholder='Subject Line' onChange={handleChangeToSubject} /> <br /> 
                    <textarea name='emailContent' id='emailContent' placeholder="Email Content Goes Here!" value={emailContent} onChange={handleChange}/> <br />
                </div>
                <input type='submit' name='submit' id='submitContent' text='Next >' />
            </form>
        </>
    )
}
