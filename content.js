let isCaptureSelectorEnabled = false;


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request.greeting)
        if (request.greeting === "enable_selector"){
            console.log("selector enabled")
            document.addEventListener('click',selectionClickListener)
            isCaptureSelectorEnabled = true;
        }
    }
)
function selectionClickListener() {
    document.addEventListener('click',(e) => {
      if (isCaptureSelectorEnabled){
        const selector = getCSSSelector(e.target)
        document.querySelector(selector).style.border = '2px solid red'
        chrome.runtime.sendMessage({greeting:'new_selector',selector:selector})
        console.log("selector disabled")
        isCaptureSelectorEnabled = false
        document.removeEventListener('click',selectionClickListener)
      }
    })
  }

  function getCSSSelector(el){
    let selector = el.tagName.toLowerCase();
    const attrs = el.attributes
    for (var i = 0; i < attrs.length; i++) {
        let attr = attrs.item(i)
        if (attr.name === 'id') selector += `#${attr.value}`;
        if (attr.name === 'class') selector += attr.value.split(' ').map((c) => `.${c}`).join('');
        if (attr.name === 'name') selector += `[${attr.name}=${attr.value}]`;
    }
    return selector
}