import "./BottomBar.css";

export default function BottomBar() {
    return (<footer id="BottomBar" className="column">
        <div className="row flexCenter">
            <p id="madeWithText">Made with: </p>

            <img alt="MongoDB Logo" className="techStackImage" src="https://webimages.mongodb.com/_com_assets/cms/kusb9stg1ndrp7j53-MongoDBLogoBrand1.png?auto=format%252Ccompress" width="100px"/>

            <img alt="NodeJS Logo" className="techStackImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png?20170401104355" width="100px"/>

            <img alt="ReactJS Logo" className="techStackImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207" width="50px"/>
            <img alt="ExpressJS Logo" className="techStackImage" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" width="100px"/>
        </div>
        <div className="row flexCenter">
            <p id="openSourcePara">This project is proudly <a target="__blank" href="https://github.com/starswap/WebsiteChangeAlert" id="openSourceLink">Open Source</a>.</p>
        </div>
        
        
    </footer>);
};
