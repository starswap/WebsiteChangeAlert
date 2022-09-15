import "./Pricing.css";

export default function Pricing() {
    return (
    <div id="Pricing" className="panel row">
            <div className="column" style={{height:"100%"}}>
                <h3>Pricing</h3>
                <div id="priceCard" className='column flexCenter'>
                    <h4 className="pricingTitle" >Website Change Alert</h4>
                    <p id="price">$0</p>
                    <p className="pricingOption">It's Free!</p>
                    <div className="pricingFeatures">
                        <ul>
                            <li>Create change triggers.</li>
                            <li>Use custom email content.</li>
                            <li>Send unlimited email alerts.</li>
                            <li>Be first to know when a website changes.</li>
                        </ul>
                    </div>
                    <a name="tryItButton" id="tryItButton" href="#pageTop">Try it now!</a>
                </div>
                <div className="spacer"></div>
                            
            </div>            
    </div>);
};
