import logo from './logo.svg';
import './App.css';

async function fetchWebsite() {
  let url = document.getElementById("url").value;
  const urlMatcher = /(https?:\/\/.*\/)/;
  
  document.cookie = "targetPage="+url+"; SameSite=None; Secure";
  document.cookie = "targetDomain="+url.match(urlMatcher)[1]+"; SameSite=None; Secure"
  document.getElementById("myFrame").src = './proxyPage';

  // document.querySelectorAll('*').forEach(item => {
  //   item.addEventListener('click', event => {
  //     alert("You clicked me")
  //   })
  // })  
}

function App() {
  return (

    <>
      <h1>Welcome to the website change alert.</h1>
      <div id="inject"></div> 
      <input id="url" type="text" value="https://latinvocabularytester.com/" />
      <input type="button" onClick={fetchWebsite} />
      <iframe id="myFrame" width={200} height={100} />
    </>

  );
}

export default App;
