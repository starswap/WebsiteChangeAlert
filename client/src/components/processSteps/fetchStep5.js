import './fetchStep5.css';

export default function FetchStep5 (props) {
    return (<>
            <h3 style={{marginBottom: 0}}>Done!</h3>
            <p>We will notify you if {props.url} changes.</p>
            <input type="button" id="another" value="Make Another Alert!" onClick={props.reset}/>
        </>
   )}