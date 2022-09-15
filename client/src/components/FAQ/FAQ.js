import "./FAQ.css";

export default function FAQ() {
    return (<div id="FAQ" className='panel'>
        <div className="row">
            <div className='column'>
                <h3>Frequently Asked Questions</h3>
                <ul id="FAQ_List">
                    <FaqQuestion question="How does this website use my personal details?" answer="We store them in MongoDB, unencrypted." />
                    <FaqQuestion question="Should this worry me?" answer="Not really, since we only collect email addresses and email content." />
                    <FaqQuestion question="Who has made this service?" answer={<>See <a href='#AboutMe' id="aboutMeLink">About the author.</a> </>} />
                    <FaqQuestion question="What is the best use of Website Change Alert that you have seen?" answer="Currently, there aren't many users of Website Change Alert, but you could change this by having the new best use-case." />

                </ul>
            </div>
        </div>
    </div>);
};


function FaqQuestion(props) {
    return <li>
        <p><strong>{props.question}</strong></p>
        <p>{props.answer}</p>
    </li>
}