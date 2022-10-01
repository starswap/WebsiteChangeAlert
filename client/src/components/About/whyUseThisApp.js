import smilingClock from '../../assets/smilingClock.png';
import "./whyUseThisApp.css";

export default function WhyUseThisApp() {
    return (<div id="About" className='panel'>
        <div className="row" id="whyUseRow">
            <div className='column' id="clockHolder">
                <div className="spacer"></div>
                <img src={smilingClock} id="clock" alt=""/>
                <div className="spacer"></div>
            </div>
            <div className='column'>
                <h3>Why should you use this website?</h3>
                <ul id="reasons">
                    <li>Because it's fun!</li>
                    <li>And Free (for now!)</li>
                    <li>It doesn't use OOP</li>
                    <li>or Java (yuck!)</li>
                    <li>and mainly...</li>
                    <li>It's just pure fun!</li>
                </ul>
            </div>
        </div>
    </div>);
};
