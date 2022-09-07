import {useState} from 'react';
import './fetchStep1.css';

export default function FetchStep1 (props) {

    let [url, setUrl] = useState("https://latinvocabularytester.com/");

      function handleChange(e) {
        setUrl(e.target.value);
      }

     function handleSubmit(e) {
        e.preventDefault();
        props.onChosen(url);
     }


      return (
        <>
          
          <h3>Enter the URL to be alerted when the site changes.</h3> 
          <form onSubmit={handleSubmit} autoComplete="off">
              <input className="urlAndEmail" type="text" value={url} onChange={handleChange} placeholder="https://..."/> 
              <input className="submitButton" type="submit" value="Fetch!"/> <br />
          </form>
        </>
      ) 
      
}
