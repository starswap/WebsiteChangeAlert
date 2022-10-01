import {useState} from 'react';
import './fetchStep3.css';

export default function FetchStep3 (props) {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");

    function handleChange(e) {
        setEmail(e.target.value);
    }
    function handleChangeToName(e) {
        setName(e.target.value);
    }


    function handleSubmit(e) {
        e.preventDefault();
        props.onChosen(name,email);
    }

    return (
        <>
            <h3>Enter your name and email.</h3> 

            <form onSubmit={handleSubmit} autoComplete="off" id="nameAndSubjectForm">
                <input type='text' name='name' placeholder="Name" value={name} onChange={handleChangeToName} id="username"/> <br />     
                <div className="row" id="emailHolder">
                    <input type='text' name='email' id='email' placeholder="Email" value={email} onChange={handleChange} className="urlAndEmail"/>
                    <input type='submit' name='submit' id='submit' value='Next >' className="submitButton"/>
                </div>
            </form>
        </>
    )
}
