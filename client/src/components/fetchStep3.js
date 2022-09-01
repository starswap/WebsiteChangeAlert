import {useState, useRef, useEffect} from 'react';
import './fetchStep3.css';

export default function FetchStep3 (props) {
    const [email,setEmail] = useState("");

    function handleChange(e) {
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onChosen(email);
    }

    return (<form onSubmit={handleSubmit}>
        <input type='text' name='email' id='email' placeholder="Email" value={email} onChange={handleChange}/>
        <input type='submit' name='submit' id='submit' value='Next >' />
    </form>)
}
