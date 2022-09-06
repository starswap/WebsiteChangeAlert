import logo from '../assets/logo.png';
import './navBar.css';

export default function NavBar(props) {
    return (
    <nav>
        <img src={logo} id="logo"/>
        <h1 id="title">Website Change Alert</h1>    
        <span className="spacer"></span>
        <a href="latinvocabularytester.com">About</a>
        <a href="latinvocabularytester.com">About</a>
        <a href="latinvocabularytester.com">About</a>
        <a href="latinvocabularytester.com">About</a>
    </nav>
    )
} 
