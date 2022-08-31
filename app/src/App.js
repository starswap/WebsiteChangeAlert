import logo from './logo.svg';
import './App.css';

function App() {
  return (

    <>
    <h1>Welcome to the website change alert.</h1>
    <div id="inject"></div> 
    <input id="url" type="text" value="https://www.janestreet.com/puzzles/current-puzzle/" />
    <input type="button" onclick="fetchWebsite()" />
    </>

  );
}

export default App;
