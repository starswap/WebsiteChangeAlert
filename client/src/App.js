import './App.css';
import hills from './assets/hills.png';

import janeSt from './assets/janeStreet.png';
import tesla from './assets/tesla.png';
import bbc from './assets/bbc.png';
import duo from './assets/duo.png';

import FetchStep1 from './components/processSteps/fetchStep1'; 
import FetchStep2 from './components/processSteps/fetchStep2'; 
import FetchStep3 from './components/processSteps/fetchStep3'; 
import FetchStep4 from './components/processSteps/fetchStep4'; 
import FetchStep5 from './components/processSteps/fetchStep5';  
import StepNumber from './components/processSteps/stepNumber';

import PopularUseCase from './components/popularUseCase';
import WhyUseThisApp from './components/whyUseThisApp';

import NavBar from './components/navBar'

import {useState} from 'react';

//const DOMAIN = "http://127.0.0.1:3000";
const DOMAIN = "https://website-change-alert.vercel.app";

async function submitData(url,email,emailContents,tagObject,subjectLine,name) {
  const rawResponse = await fetch(DOMAIN+'/submit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: url,
        email: email,
        emailContents: emailContents,
        tagObjectString: tagObject.outerHTML.replace(/ class=""/g, ""),
        subjectLine: subjectLine,
        username: name
      })
  });
  const content = await rawResponse.json();

  console.log(content);
}

function App() {
  const [stepNumber,setStepNumber] = useState(1);
  const [url,setUrl] = useState("");
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");

  let [emailContents,setEmailContents] = useState("");
  const [tagObject,setTagObject] = useState("");
  let [subjectLine,setSubjectLine] = useState("");

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
    currentStep = (<FetchStep3 onChosen={ (nameToSet,emailToSet) => {
      setEmail(emailToSet);
      setName(nameToSet);
      setStepNumber( (stepNo) => stepNo+1);
    }}/>)
  else if (stepNumber === 4)
    currentStep = (<FetchStep4 onChosen={ (emailSubjectToSet,emailContentsToSet) => {
      setEmailContents(emailContentsToSet);
      emailContents = emailContentsToSet; //local update.

      setSubjectLine(emailSubjectToSet);
      subjectLine = emailSubjectToSet;
      submitData(url,email,emailContents,tagObject,subjectLine,name);
      
      setStepNumber( (stepNo) => stepNo+1);
    }}/>)
    else if (stepNumber === 5)
      currentStep = (<FetchStep5 url={url} reset={() => {setStepNumber(1);}}/>)    


  const goBack = () => {
    setStepNumber((stepNumber) => stepNumber-1);
  }

  return (

    <div className="App">
      <NavBar />

      <div id="topContainer">
        <div className="grid">
          <div className="column left">
            {(stepNumber !== 5 && stepNumber !== 1) && <input type="button" id="back" value="&#8249;" name="back" onClick={goBack}/>}
          </div>
          <div className="column center">

           { (stepNumber === 1) && <h1 id="tagline">Stay on top of website changes with the Website Change Alert.</h1>}

            {(stepNumber !== 1) && <StepNumber num={stepNumber}/>}
            {currentStep} <br />

          </div>
          <div className="column right"></div>
        </div>
        <div className='spacer' />
        
        
        {(stepNumber === 1) &&  <div className='row'>
          <PopularUseCase src={janeSt} text="Alert me when there's a new Jane Street Puzzle!" />
          <PopularUseCase src={tesla} text="Alert me when there's a new Tesla Internship!" />
          <PopularUseCase src={bbc} text="Alert me when there's a new Prime Minister!" />
          <PopularUseCase src={duo} text="Alert me when there's a new Language Course!" />
        </div>}
        <div className='spacer' />
        {(stepNumber === 1) && <img alt="" id="hills" src={hills}/>}
      </div>

      <WhyUseThisApp />
      
    </div>

  );
}

export default App;
//(stepNumber !== 1) 