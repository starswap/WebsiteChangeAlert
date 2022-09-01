import logo from './logo.svg';
import './App.css';
import FetchStep1 from './components/fetchStep1'; 
import FetchStep2 from './components/fetchStep2'; 
import FetchStep3 from './components/fetchStep3'; 
import FetchStep4 from './components/fetchStep4'; 
import FetchStep5 from './components/fetchStep5'; 


import {useState} from 'react';

function App() {
  const [stepNumber,setStepNumber] = useState(1);
  const [url,setUrl] = useState("");
  const [email,setEmail] = useState("");
  const [emailContents,setEmailContents] = useState("");
  const [tagObject,setTagObject] = useState("");

  let currentStep;

  if (stepNumber == 1)
    currentStep = (<FetchStep1 onChosen={ (urlToSet) => {
      if (urlToSet[urlToSet.length-1] != '/') {
        urlToSet += '/'; //temporary
      }
      if (urlToSet.substring(0,4) != 'http') {
        urlToSet = "http://" + urlToSet;
      }

      setUrl(urlToSet);
      setStepNumber( (stepNo) => stepNo+1);

    }} setUrl={setUrl}/>)
  else if (stepNumber == 2)
    currentStep = (<FetchStep2 onChosen={ (tagObjectToSet) => {
      setTagObject(tagObjectToSet);
      setStepNumber( (stepNo) => stepNo+1);
    }} url={url}/>)
  else if (stepNumber == 3)
    currentStep = (<FetchStep3 onChosen={ (emailToSet) => {
      setEmail(emailToSet);
      setStepNumber( (stepNo) => stepNo+1);
    }}/>)
  else if (stepNumber == 4)
    currentStep = (<FetchStep4 onChosen={ (emailContentsToSet) => {
      setEmailContents(emailContentsToSet);

      //CODE FOR SUBMIT GOES HERE
      
      setStepNumber( (stepNo) => stepNo+1);
    }}/>)
    else if (stepNumber == 5)
      currentStep = (<FetchStep5 url={url} reset={() => {setStepNumber(1);}}/>)    


  const goBack = () => {
    setStepNumber((stepNumber) => stepNumber-1);
  }

  return (

    <div className="App">
      <h1 id="title">Welcome to the website change alert.</h1>
      {currentStep} <br />
      {(stepNumber !== 5) && <input type="button" value="< Back" name="back" onClick={goBack}/>}
    </div>

  );
}

export default App;
