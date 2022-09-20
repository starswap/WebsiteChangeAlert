import { JSDOM } from 'jsdom';
import fetch from 'node-fetch'; 

application.remote.alert('Plugin Started');

var document;

async function fetchAndBuildDOM(url) {
    let htmlResponse = await fetch(url).then((response) => {return response.text()});
    const options = {
        runScripts: "dangerously",
        resources: "usable",
        url: url
   };
    ({ document } = (new JSDOM(htmlResponse, options)).window);
    return document;
}

async function hasTheWebsiteChanged(elementToTrack) {
    if (!stringMatch(document.body.outerHTML,elementToTrack)) { //target element no longer on page in desired form
        return true;
    }
    else {
        return false;
    }
}

function getElementFromChildIndex(document,childIndexArray) {
    let htmlElement = document.body;
    for (let index of childIndexArray) {
        console.log(htmlElement);
        if (htmlElement.children.length <= index) {
            return false; //not possible to resolve.
        } else {
            htmlElement = htmlElement.children[index];
        }
    }
    return htmlElement;
}

function stringMatch(string,pattern) {
    for (let i=0;i<string.length;++i) {
        let found = true;
        for (let j=0;j<pattern.length;++j) {
            if (string[i+j] != pattern[j]){
                found = false;
                break;
            }
        }
        if (found == true) {
            return true;
        }
    }
    return false;
} 

function getElementOuterHTMLById(id) {
    const outerHTML = document.getElementById(id).outerHTML;
    return outerHTML;
}

function getElementTagTextById(id) {
    const outerHTML = document.getElementById(id).cloneNode().outerHTML;
    return outerHTML;
}

function getElementOuterHTMLFromChildIndex(childIndexArray) {
    const outerHTML = getElementFromChildIndex(childIndexArray).outerHTML;
    return outerHTML;
}

function getElementTagTextFromChildIndex(childIndexArray) {
    const outerHTML = getElementFromChildIndex(childIndexArray).cloneNode().outerHTML;
    return outerHTML;
}


var api = {
    fetchAndBuildDOM: fetchAndBuildDOM,
    
}

// exports the api to the application environment
application.setInterface(api);