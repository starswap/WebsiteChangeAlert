import smilingClock from '../../assets/smilingClock.png';
import "./AboutMe.css";

export default function AboutMe() {
    return (<div id="AboutMe" className='panel column'>
        <h2>About the Author</h2>

        <div className="row">
            <div className='column'>
                <blockquote id="myline">Hi, I'm Hamish Starling, a Computing student at Imperial College London.</blockquote>
                <div className="row" id="socials">
                    
                    <div className='spacer'></div>
                    <div className='spacer'></div>
                    <Social link="https://github.com/starswap" imgLink="https://upload.wikimedia.org/wikipedia/commons/c/cd/GitHub-Mark-64px.png" />
                    <div className='spacer'></div>
                    <Social link="https://www.linkedin.com/in/hamish-starling-147859235/" imgLink="https://brand.linkedin.com/content/dam/me/brand/en-us/brand-home/logos/In-Blue-Logo.png.original.png" />
                    <div className='spacer'></div>
                    <Social link="https://devpost.com/starswap" imgLink="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyODAuMyAyNDIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI4MC4zIDI0MiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGcgaWQ9IlhNTElEXzFfIj48cGF0aCBpZD0iWE1MSURfNl8iIGQ9Ik0xMzMuNyw3NkgxMTh2OTBoMTQuN2MzMC45LDAsNDUuMS0xOC4xLDQ1LjEtNDVDMTc3LjgsOTAuOSwxNjQuOSw3NiwxMzMuNyw3NnoiLz48cGF0aCBpZD0iWE1MSURfOV8iIGQ9Ik0yMTAuMiwwSDcwLjFMMCwxMjFsNzAuMSwxMjFoMTQwLjFsNzAuMS0xMjFMMjEwLjIsMHogTTEzMi43LDE5NUg4OVY0N2g0NS44YzQyLjEsMCw3My4zLDIwLjEsNzMuMyw3NEMyMDguMSwxNzIuOCwxNzAuNiwxOTUsMTMyLjcsMTk1eiIvPjwvZz48L3N2Zz4=" />
                    <div className='spacer'></div>
                    <div className='spacer'></div>

                </div>
            </div>

            <div className='column'>
                <img id="me" src="https://avatars.githubusercontent.com/u/37508609?v=4" alt=""/>
            </div>

        </div>
    </div>);
};

function Social(props) {
    return (
        <a href={props.link} target="__blank" className='surroundingButton'>
            <img src={props.imgLink} />
        </a>
    )
}