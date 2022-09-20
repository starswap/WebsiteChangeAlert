export default function getChildIndex(htmlElement) {
    let childArray = [];

    while (htmlElement.tagName !== "BODY") {
        console.log(htmlElement)
        let currIndex = Array.from(htmlElement.parentElement.children).indexOf(htmlElement);
        childArray.push(currIndex);
        htmlElement = htmlElement.parentElement;
    }
    return childArray.reverse();    
}

