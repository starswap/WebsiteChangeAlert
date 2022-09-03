import './App.css';
import FetchStep1 from './components/fetchStep1'; 
import FetchStep2 from './components/fetchStep2'; 
import FetchStep3 from './components/fetchStep3'; 
import FetchStep4 from './components/fetchStep4'; 
import FetchStep5 from './components/fetchStep5';  
import StepNumber from './components/stepNumber';

import {useState} from 'react';

async function submitData(url,email,emailContents,tagObject) {
  const rawResponse = await fetch('https://127.0.0.1:3000/submit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: url,
        email: email,
        emailContents: emailContents,
        tagObjectString: tagObject.outerHTML.replace(/ class=""/g, "")
      })
  });
  const content = await rawResponse.json();

  console.log(content);
}

function App() {
  const [stepNumber,setStepNumber] = useState(1);
  const [url,setUrl] = useState("");
  const [email,setEmail] = useState("");
  const [emailContents,setEmailContents] = useState("");
  const [tagObject,setTagObject] = useState("");

  let currentStep;
  if (stepNumber === 1)
    currentStep = (<FetchStep1 onChosen={ (urlToSet) => {
      if (urlToSet[urlToSet.length-1] !== '/') {
        urlToSet += '/'; //temporary
      }
      if (urlToSet.substring(0,4) !== 'http') {
        urlToSet = "http://" + urlToSet;
      }

      setUrl(urlToSet);
      setStepNumber( (stepNo) => stepNo+1);

    }} setUrl={setUrl}/>)
  else if (stepNumber === 2)
    currentStep = (<FetchStep2 onChosen={ (tagObjectToSet) => {
      setTagObject(tagObjectToSet);
      setStepNumber( (stepNo) => stepNo+1);
    }} url={url}/>)
  else if (stepNumber === 3)
    currentStep = (<FetchStep3 onChosen={ (emailToSet) => {
      setEmail(emailToSet);
      setStepNumber( (stepNo) => stepNo+1);
    }}/>)
  else if (stepNumber === 4)
    currentStep = (<FetchStep4 onChosen={ (emailContentsToSet) => {
      setEmailContents(emailContentsToSet);

      submitData(url,email,emailContentsToSet,tagObject);
      
      setStepNumber( (stepNo) => stepNo+1);
    }}/>)
    else if (stepNumber === 5)
      currentStep = (<FetchStep5 url={url} reset={() => {setStepNumber(1);}}/>)    


  const goBack = () => {
    setStepNumber((stepNumber) => stepNumber-1);
  }

  return (

    <div className="App">
      <h1 id="title">Website Change Alert</h1>
      <div id="topContainer">

        <div className="grid">
          <div className="column left">
            {(stepNumber !== 5 && stepNumber !== 1) && <input type="button" id="back" value="&#8249;" name="back" onClick={goBack}/>}
          </div>
          <div className="column center">
            <StepNumber num={stepNumber}/>
            {currentStep} <br />
          </div>
          <div className="column right"></div>
        </div>
      


      </div>
    </div>

  );
}

export default App;
