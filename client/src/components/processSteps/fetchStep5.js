import './fetchStep5.css';

export default function FetchStep5 (props) {
    if (props.success) {
        return (<>
            <h3 style={{marginBottom: 0}}>Done!</h3>
            <p>We will notify you if {props.url} changes.</p>
            <input type="button" id="another" value="Make Another Alert!" onClick={props.reset}/>
        </>
        )
    } else {
        return (<>
            <h3 style={{marginBottom: 0}}>Failure!</h3>
            <p>I'm afraid you need to authenticate to get access to the service; please contact the Administrator.</p>
            <input type="button" id="another" value="Go Back Home" onClick={props.reset}/>
        </>
        )
    }
}