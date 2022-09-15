import logo from '../assets/logo.png';
import './navBar.css';

export default function NavBar(props) {
    return (
    <nav>
        <img alt="'Green Face' Website Change Alert Logo" src={logo} id="logo"/>
        <h1 id="title">Website Change Alert</h1>    
        <span className="spacer"></span>
        <a href="#About">About</a>
        <a href="#FAQ">FAQ</a>
        <a href="#Pricing">Pricing</a>
        <a href="#AboutMe">About Me</a>
    </nav>
    )
} 
