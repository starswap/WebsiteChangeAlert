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
        <form onSubmit={handleSubmit}>
            <input id="url" type="text" value={url} onChange={handleChange} /> 
            <input type="submit" value="Fetch!"/> <br />
        </form>
      ) 
      
}
