import {useState, useRef, useEffect} from 'react';

export default function FetchStep3 () {
    return (<form>
        <input type='text' name='email' id='email' placeholder="Email" />
        <textarea id="emailContent" />
    </form>)
}

